from ... import socketio
from flask import request
import app.blueprints.main.events as events
import dill
import itertools
from flask_socketio import join_room, leave_room
import app.blueprints.main.rooms as room_file
import app.blueprints.main.NPCs as npc_file
import app.blueprints.main.items as item_file
from random import randint

#World class that holds all entities
class World():
    def __init__(self) -> None:
        self.timer_active = False
        rooms = {}
        for room in room_file.room_dict.values():
            new_room = Room(room['name'], room['description'], room['position'], room['exits'], room['icon'], room['ambiance_list'])
            rooms.update({new_room.position: new_room})
        self.rooms = rooms
        self.players = {}

        npcs = {}
        for npc in npc_file.npc_dict.values():
            new_npc = NPC(npc['name'], npc['aliases'], npc['description'], npc['deceased'], npc['health'], npc['level'], npc['location'], npc['home'], npc['ambiance_list'], npc['can_wander'], npc['attackable'])
            self.rooms[new_npc.location].contents['NPCs'].update({new_npc.id: new_npc})
            npcs.update({new_npc.id: new_npc})
        self.npcs = npcs

        for item in item_file.item_dict.values():
            new_item = Item(item['name'], item['description'], item['aliases'], item['group'], item['weight'], item['location'])
            for room_id, room in self.rooms.items():
                if new_item.location == room_id:
                    room.contents['Items'].update({new_item.id: new_item})
                    print(f'added {new_item.name} to {room.name}. Room inventory is {room.contents}')

    def world_test(self):
        for room in self.rooms.values():
            print(id(room), room.name, room.contents)

    def world_who(self, player):
        player_list = []
        for player_who in self.players.values():
            player_list.append(player_who.name)
        output = '<br/> Currently Online Players: <br/>'
        for player_who in player_list:
            output += f'{player_who}<br/>'
        socketio.emit('event', {'message': output}, to=player.session_id)

    #Might not use this, and instead use individual pickles for each entity type for modularization
    # def world_save(self):
    #     with open('app/data/world_db.pkl', 'wb') as dill_file:
    #         dill.dump(self, dill_file)
    #     socketio.emit('event', {'message': 'world saved'})

    # def room_save(self):
    #     with open('app/data/room_db.pkl', 'wb') as dill_file:
    #         dill.dump(self.rooms, dill_file)
    #     socketio.emit('event', {'message': 'rooms saved'})


#Overall class for any interactable object in the world
class Entity():
    def __init__(self, name, description) -> None:
        self.name = name #Shorthand name for an entity
        self.description = description #Every entity needs to be able to be looked at

    #Test function currently, but every entity needs to be able to describe itself when looked at
    def describe(self):
        pass

#Class for rooms. Rooms should contain all other objects (NPCs, Items, Players, anything else that gets added)
class Room(Entity):
    id = itertools.count()
    def __init__(self, name, description, position, exits, icon, ambiance_list) -> None:
        super().__init__(name, description)
        self.id = next(Room.id)
        self.position = position #Coordinates in the grid system for a room, will be used when a character moves rooms
        self.exits = exits #List of rooms that are connected to this room. Should be N,S,E,W but may expand so a player can "move/go shop or someting along those lines"
        self.icon = icon #Icon for the world map, should consist of two ASCII characters (ie: "/\" for a mountain)
        self.contents = {'NPCs': {}, 'Players': {}, 'Items': {}} #Dictionary containing all NPCs, Players, and Items currently in the room. Values will be modified depending on character movement, NPC generation, and item movement
        self.ambiance_list = ambiance_list

    def describe_exits(self):
        output = '<strong>[</strong> Exits: '
        for each in self.exits:
            output += f'⟪<strong>{each}</strong>⟫ '
        output += '<strong>]</strong>'
        return output

    def describe_contents(self, caller):
        output = ''
        item_output = ''
        player_list = dict(self.contents['Players'])
        del player_list[caller.id]
        player_key = list(enumerate(player_list))
        item_list = dict(self.contents['Items'])
        item_key = list(enumerate(item_list))
        npc_list = dict(self.contents['NPCs'])
        corpse_list = {}
        for id, npc in npc_list.copy().items():
            if npc.deceased:
                corpse_list[id] = npc_list.pop(id)
        corpse_key = list(enumerate(corpse_list))
        npc_key = list(enumerate(npc_list))
        total_list = []
        total_corpses = []
        total_items = []
        for i in range(len(player_list)):
            total_list.append(f'<em><strong>{player_list[player_key[i][1]].name}</strong></em>')
        for i in range(len(npc_list)):
            total_list.append(npc_list[npc_key[i][1]].name)
        for i in range(len(corpse_list)):
            total_corpses.append(corpse_list[corpse_key[i][1]].name)
        for i in range(len(item_list)):
            total_items.append(item_list[item_key[i][1]].name)
        if len(total_list) == 0:
            pass
        elif len(total_list) == 1:
            output += f'{total_list[0]} stands here.'
        elif len(total_list) == 2:
            output += f'{total_list[0]} and {total_list[1]} stand here.'
        else:
            for i in range(len(total_list)):
                if i == len(total_list)-1:
                    output += f'and {total_list[i]} stand here.'
                else: output += f'{total_list[i]}, '

        if len(total_corpses) == 0:
            pass
        elif len(total_corpses) == 1:
            output += f' The body of {total_corpses[0]} is on the ground here.'
        elif len(total_corpses) == 2:
            output += f' The bodies of {total_corpses[0]} and {total_corpses[1]} lay here.'
        else:
            for i in range(len(total_corpses)):
                if i == 0:
                    item_output += f'The bodies of {total_corpses[i]}, '
                if i == len(total_corpses)-1:
                    item_output += f'and {total_corpses[i]} lay here.'
                else: item_output += f'{total_corpses[i]}, '


        if len(total_items) == 0:
            pass
        elif len(total_items) == 1:
            item_output += f' There is a {total_items[0]} here.'
        elif len(total_items) == 2:
            item_output += f' There is a {total_items[0]} and a {total_items[1]} here.'
        else:
            for i in range(len(total_items)):
                if i == 0:
                    item_output += f'A {total_items[i]}, '
                if i == len(total_items)-1:
                    item_output += f'and {total_items[i]} lay here.'
                else: item_output += f'a {total_items[i]}, '

        
        
        socketio.emit('event', {'message': output}, to=caller.session_id)
        socketio.emit('event', {'message': item_output}, to=caller.session_id)
        socketio.emit('event', {'message': self.describe_exits()}, to=caller.session_id)

            

    def ambiance(self):
        if randint(1,5) == 5:
            socketio.emit('event', {'message': f'{self.ambiance_list[randint(0,len(self.ambiance_list)-1)]}'}, to=self.position)


#Broad class for any entity capable of independent and autonomous action that affects the world in some way
default_stats = {
'strength': 10,
'endurance': 10,
'intelligence': 10,
'wisdom': 10,
'charisma': 10,
'agility': 10
}
class Character(Entity):
    def __init__(self, name, description, health, level, location, stats, deceased) -> None:
        super().__init__(name, description)
        self.health = health #All characters should have a health value
        self.level = level #All characters should have a level value
        self.location = location #All characters should have a location, reflecting their current room and referenced when moving
        self.stats = stats #All characters should have a stat block.
        self.deceased = deceased #Indicator of if a character is alive or not. If True, inventory can be looted
        self.inventory = [] #List of items in character's inventory. May swap to a dictionary of lists so items can be placed in categories


#Class that users control to interact with the world. Unsure if I need to have this mixed in with the models side or if it would be easier to pickle the entire class and pass that to the database?
class Player(Character):
    def __init__(self, id, account, name, description, health=100, level=1, location='0,0', stats=dict(default_stats), deceased=False) -> None:
        super().__init__(name, description, health, level, location, stats, deceased)
        self.id = id
        self.account = account #User account associated with the player character
        self.session_id = '' #Session ID so messages can be broadcast to players without other members of a room or server seeing the message. Session ID is unique to every connection, so part of the connection process must be to assign the new value to the player's session_id
        self.inventory = list([])
        self.player_map = ''
        self.in_combat = False

    def connection(self):
        events.world.rooms[self.location].contents['Players'].update({self.id: self})
        socketio.emit('event', {'message': f'<br/><strong>{events.world.rooms[self.location].name}</strong>'}, to=self.session_id)
        socketio.emit('event', {'message': events.world.rooms[self.location].description}, to=self.session_id)
        events.world.rooms[self.location].describe_contents(self)

    def disconnection(self):
        del events.world.rooms[self.location].contents['Players'][self.id]

    # def player_save(self):
    #         player_account = PlayerAccount.query.get(self.id)
    #         player_account.player_info = dill.dumps(self)
    #         player_account.save()
    #     print(f'{self.name} saved')
    #     return

    def set_description(self, data):
        self.description = data
        socketio.emit('event', {'message': f'Your description has been updated to "{self.description}"'}, to=self.session_id)

    def look(self, data, room):
        if data == '':
            # socketio.emit('event', {'message': self.location}, to=self.session_id)
            socketio.emit('event', {'message': f'<br/><strong>{room.name}</strong>'}, to=self.session_id)
            socketio.emit('event', {'message': room.description}, to=self.session_id)
            room.describe_contents(self)
        elif data in ['me', 'myself']:
            socketio.emit('event', {'message': 'You really want me to describe you, to <em>you</em>? You really are something. Get your kicks somewhere else, bucko.'}, to=self.session_id)
        else:
            for player in room.contents['Players'].values():
                if player == self:
                    continue
                if player.name.lower().startswith(data.lower()):
                    socketio.emit('event', {'message': player.description}, to=self.session_id)
                    return
            for npc in room.contents['NPCs'].values():
                for alias in npc.aliases:
                    if alias.lower().startswith(data.lower()):
                        if npc.deceased:
                            socketio.emit('event', {'message': npc.description_deceased}, to=self.session_id)
                            return
                        socketio.emit('event', {'message': npc.description}, to=self.session_id)
                        return
            for item in room.contents['Items'].values():
                for alias in item.aliases:
                    if alias.lower().startswith(data.lower()):
                        socketio.emit('event', {'message': item.description}, to=self.session_id)
                        return
            for direction, room in room.exits.items():
                if direction.lower().startswith(data.lower()):
                    if events.world.rooms[room].name.startswith('The'):
                        socketio.emit('event', {'message': f'{events.world.rooms[room].name} lies that way.'}, to=self.session_id)
                        return
                    socketio.emit('event', {'message': f'The {events.world.rooms[room].name} lies that way.'}, to=self.session_id)
                    return
                
    def location_map(self):
        self_map = []
        if '0,' not in self.location and '1,' not in self.location and '2,' not in self.location and '3,' not in self.location and '4,' not in self.location and '5,' not in self.location and '6,' not in self.location and '7,' not in self.location and '8,' not in self.location and '9,' not in self.location:
            for i in range(1,10):
                if i != 5:
                    if i == 3:
                        self_map.append('<span style="background-color: tan">&nbsp;&nbsp;</span><br>')
                    elif i == 6:
                        self_map.append('<span style="background-color: tan">&nbsp;&nbsp;</span><br>')
                    else:
                        self_map.append('<span style="background-color: tan">&nbsp;&nbsp;</span>')
                else: self_map.append('<span style="background-color:LightBlue; color: DodgerBlue">()</span>')
        else:
            for i in range(1,10):
                lon, lat = self.location.split(',', 1)
                lon = int(lon)
                lat = int(lat)
                if i == 1:
                    lat += 1
                    lon -= 1
                    try:
                        self_map.append(f'{events.world.rooms[f"{lon},{lat}"].icon}')
                    except KeyError:
                        self_map.append('<span class="map-square" style="background-color: tan">&nbsp;&nbsp;</span>')
                if i == 2:
                    lat += 1
                    try:
                        self_map.append(f'{events.world.rooms[f"{lon},{lat}"].icon}')
                    except KeyError:
                        self_map.append('<span class="map-square" style="background-color: tan">&nbsp;&nbsp;</span>')
                if i == 3:
                    lat += 1
                    lon += 1
                    try:
                        self_map.append(f'{events.world.rooms[f"{lon},{lat}"].icon}<br>')
                    except KeyError:
                        self_map.append('<span class="map-square" style="background-color: tan">&nbsp;&nbsp;</span><br>')
                if i == 4:
                    lon -= 1
                    try:
                        self_map.append(f'{events.world.rooms[f"{lon},{lat}"].icon}')
                    except KeyError:
                        self_map.append('<span class="map-square" style="background-color: tan">&nbsp;&nbsp;</span>')
                if i == 5:
                    self_map.append('<span class="map-square" style="background-color:LightBlue; color: DodgerBlue">()</span>')
                if i == 6:
                    lon += 1
                    try:
                        self_map.append(f'{events.world.rooms[f"{lon},{lat}"].icon}<br>')
                    except KeyError:
                        self_map.append('<span class="map-square" style="background-color: tan">&nbsp;&nbsp;</span><br>')
                if i == 7:
                    lat -= 1
                    lon -= 1
                    try:
                        self_map.append(f'{events.world.rooms[f"{lon},{lat}"].icon}')
                    except KeyError:
                        self_map.append('<span class="map-square" style="background-color: tan">&nbsp;&nbsp;</span>')
                if i == 8:
                    lat -= 1
                    try:
                        self_map.append(f'{events.world.rooms[f"{lon},{lat}"].icon}')
                    except KeyError:
                        self_map.append('<span class="map-square" style="background-color: tan">&nbsp;&nbsp;</span>')
                if i == 9:
                    lat -= 1
                    lon += 1
                    try:
                        self_map.append(f'{events.world.rooms[f"{lon},{lat}"].icon}')
                    except KeyError:
                        self_map.append('<span class="map-square" style="background-color: tan">&nbsp;&nbsp;</span>')
        output = '<tt class="map-square" style="margin-bottom: 0">'
        for icon in self_map:
            output += icon
        output += '</tt>'
        self.player_map = output
        socketio.emit('map', {'map': self.player_map}, to=self.session_id)
        
    
    def speak(self, data):
        socketio.emit('event', {'message': f'{self.name} says "{data}"'}, room=self.location, include_self=False)
        socketio.emit('event', {'message': f'You say "{data}"'}, to=self.session_id)

    def whisper(self, whisper_player, data):
        socketio.emit('event', {'message': f'The wind breathes against your ear, and you can faintly hear "{data}". You get a feeling it\'s from {self.name}.'}, to=whisper_player.session_id)
        socketio.emit('event', {'message': 'You whisper your message to the wind.'}, to=self.session_id)

    def combat(self, victim):
        if not victim.attackable:
            print()
            socketio.emit('event', {'message': 'It\'s ok. I get it. Sometimes someone says something and it just makes you so angry. Unfortunately, whoever you\'re currently targeted with your untethered rage is just so important we can\'t let you hurt them. Sorry bud, go punch a tree.'}, to=self.session_id)
            return
        if isinstance(victim, NPC):
            if victim.deceased:
                socketio.emit('event', {'message': 'Jesus man they\'re already dead calm down. Go talk to a psychiatrist or something.'}, to=self.session_id)
            else:
                socketio.emit('event', {'message': f'{self.name} slams their fist into {victim.name}, killing them instantly.'}, to=self.location, skip_sid=self.session_id)
                socketio.emit('event', {'message': f'You slam your fist into {victim.name}, killing them instantly.'}, to=self.session_id)
                victim.deceased = True
                return

    def move(self, direction, room):
        if direction not in room.exits:
            socketio.emit('event', {'message': 'You can\'t go that way.'}, to=self.session_id)
            return
        leave_room(self.location)
        if direction in ['out', 'in']:
            socketio.emit('event', {'message': f'{self.name} moves towards the {room.exits[direction]}'}, room=self.location)
        else:
            socketio.emit('event', {'message': f'{self.name} moves towards the {direction}'}, room=self.location)
        if self.id in room.contents['Players']:
            del room.contents['Players'][self.id]
        if direction in ['out', 'in']:
            socketio.emit('event', {'message': f'You move towards the {events.world.rooms[room.exits[direction]].name}'}, to=self.session_id)
        else:
            socketio.emit('event', {'message': f'You move towards the {direction}'}, to=self.session_id)

        new_location = room.exits[direction]
        if direction in ['out', 'in']:
            print(events.world.rooms[new_location].exits)
            came_from = [i for i in events.world.rooms[new_location].exits if events.world.rooms[new_location].exits[i]==self.location]
        else:
            came_from = [i for i in events.world.rooms[new_location].exits if events.world.rooms[new_location].exits[i]==self.location]
        socketio.emit('event', {'message': f'{self.name} arrives from the {came_from[0]}'}, room=new_location)
        socketio.sleep(.5)
        self.location = new_location
        join_room(self.location)
        self.location_map()
        events.world.rooms[self.location].contents['Players'].update({self.id: self})
        socketio.emit('event', {'message': f'<br/><strong>{events.world.rooms[self.location].name}</strong>'}, to=self.session_id)
        socketio.emit('event', {'message': events.world.rooms[self.location].description}, to=self.session_id)
        events.world.rooms[self.location].describe_contents(self)
    
    def inventory_update(self):
        inventory_send = []
        for item_inv in self.inventory:
                item_info = {
                    'id': item_inv.id,
                    'name': item_inv.name,
                    'group': item_inv.group
                }
                inventory_send.append(item_info)
        socketio.emit('inventory', {'inventory': inventory_send}, to=self.session_id)

    def inventory_display(self):
        inventory_send = []
        if not self.inventory:
            socketio.emit('event', {'message': 'Sorry bud, you don\'t have anything in your inventory right now.'}, to=self.session_id)
        else:
            output = '<br/>Inventory:<br/>'
            for item_inv in self.inventory:
                item_info = {
                    'id': item_inv.id,
                    'name': item_inv.name,
                    'group': item_inv.group
                }
                output += f'{item_inv.name}<br/>'
                inventory_send.append(item_info)
            print(inventory_send)
            socketio.emit('event', {'message': output}, to=self.session_id)
            socketio.emit('inventory', {'inventory': inventory_send}, to=self.session_id)

    def item_get(self, item, room):
        inventory_send = []
        for item_id, room_item in room.contents['Items'].copy().items():
            if item in room_item.aliases:
                self.inventory.append(room.contents['Items'].pop(item_id))
                socketio.emit('event', {'message': f'You get the {room_item.name}.'}, to=self.session_id)
                socketio.emit('event', {'message': f'You see {self.name} grab a {room_item.name}.'}, to=self.location, skip_sid=self.session_id)
                for item_inv in self.inventory:
                    item_info = {
                        'id': item_inv.id,
                        'name': item_inv.name,
                        'group': item_inv.group
                    }
                    inventory_send.append(item_info)
                socketio.emit('inventory', {'inventory': inventory_send}, to=self.session_id)
                return
        socketio.emit('event', {'message': f'I have absolutely no clue what you\'re trying to get here. I don\'t see a "{item}" here.'}, to=self.session_id)

    def item_drop(self, item, room):
        inventory_send = []
        for i in range(len(self.inventory.copy())):
            for alias in self.inventory[i].aliases:
                if item == alias:
                    drop_item = self.inventory.pop(i)
                    room.contents['Items'][drop_item.id] = drop_item
                    socketio.emit('event', {'message': f'You drop the {drop_item.name}.'}, to=self.session_id)
                    socketio.emit('event', {'message': f'You see {self.name} drop a {drop_item.name}.'}, to=self.location, skip_sid=self.session_id)
                    for item_inv in self.inventory:
                        item_info = {
                            'id': item_inv.id,
                            'name': item_inv.name,
                            'group': item_inv.group
                        }
                        inventory_send.append(item_info)
                    socketio.emit('inventory', {'inventory': inventory_send}, to=self.session_id)
                    return
        socketio.emit('event', {'message': f'Check your pockets, cause I don\'t see a "{item}" in your inventory.'}, to=self.session_id)

#Class that is controlled by the server. Capable of being interacted with.
class NPC(Character):
    id = itertools.count()
    def __init__(self, name, aliases, description, deceased, health, level, location, home, ambiance_list, can_wander, attackable, stats=dict(default_stats)) -> None:
        self.id = next(NPC.id)
        self.name = name
        self.aliases = aliases
        self.description = description
        self.description_deceased = f'The corpse of {self.name}, crumpled and torn.'
        self.deceased = deceased
        self.health = health
        self.level = level
        self.location = location
        self.home = home #Spawn location if NPC is killed. Can also double as a bound to prevent NPC from wandering too far from home during world timer movement
        self.ambiance_list = ambiance_list
        self.can_wander = can_wander
        self.inventory = list([])
        self.in_combat = False
        self.attackable = attackable

    def ambiance(self):
        if self.deceased:
            return
        numb = randint(1,5)
        if numb == 5:
            socketio.emit('event', {'message': f'{self.ambiance_list[randint(0,len(self.ambiance_list)-1)]}'}, to=self.location)
        elif numb == 4:
            if self.can_wander:
                lon, lat = self.location.split(',', 1)
                lon = int(lon)
                lat = int(lat)
                move_x = randint(-1,1)
                move_y = randint(-1,1)
                lon += move_x
                lat += move_y
                new_location = f'{lon},{lat}'
                for direction, coords in events.world.rooms[self.location].exits.items():
                    if new_location == coords:
                        socketio.emit('event', {'message': f'{self.name} wanders away towards the {direction}.'}, to=self.location)
                        del events.world.rooms[self.location].contents['NPCs'][self.id]
                        self.location=new_location
                        events.world.rooms[self.location].contents['NPCs'].update({self.id: self})
                        socketio.emit('event', {'message': f'{self.name} wanders in.'}, to=self.location)
                        break



#Class that is incapable of autonomous action. Inanimate objects and such.
class Item(Entity):
    id = itertools.count()
    def __init__(self, name, description, aliases, group, weight, location=None, equippable=False) -> None:
        super().__init__(name, description)
        self.aliases = aliases
        self.id = next(Item.id)
        self.group = group #Type of item. Food, equipment, quest, etc
        self.weight = weight #Weight of item. Will be used alongside character strength to determine if the item can be picked up, pulled to inventory, etc
        self.location = location
        self.equippable = equippable #Can you equip the item. Unsure if redundant with equipment class

#Subclass of items that is capable of being equipped by the Character class
class Equipment(Item):
    def __init__(self, name, description, group, weight, category, equippable) -> None:
        super().__init__(name, description, group, weight, equippable)
        self.equippable = True #All equipment should be equippable
        self.category = category #Further granularity with group. Is the equipment armor, clothing, sword, axe, etc. Unsure if I should instead make child classes of equipment instead so I can dictate specific stat blocks