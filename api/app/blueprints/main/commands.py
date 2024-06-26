from flask import session, request
from flask_login import current_user
from ... import socketio
from flask_socketio import join_room, leave_room, emit
import app.blueprints.main.events as events



#List of commands that are dependant on input from the client. Still unsure as to if I need the middle man function.
@socketio.event
def client(data):
    current_player = events.world.players[session.get('player_id')]
    current_room = events.world.rooms[current_player.location]
    content = {
        'player': current_player,
        'room': current_room,
        'command': data['command'].lower(),
        'data': data['data'],
    }

    if content['command'] == 'who':
        events.world.world_who(content['player'])
        return

    elif content['command'] == 'say':
        say(content['player'], content['data'])
        return
    
    elif content['command'] in ['attack', 'kill', 'hurt', 'k', 'fight']:
        combat(content['player'], content['data'].lower())
        return

    elif content['command'][0] == '"':
        new_data = content['command'][1:]
        if ' ' in content['data']:
            data_final = f'{new_data} {content["data"]}'
            say(content['player'], data_final)
        else: say(content['player'], new_data)
        return

    elif content['command'] in ['i', 'inv', 'inv']:
        inventory_display(content['player'])
        return
    
    elif content['command'] in ['get', 'grab', 'pick', 'pickup', 'g']:
        item_get(content['player'], content['data'], content['room'])

    elif content['command'] in ['drop', 'discard', 'd']:
        item_drop(content['player'], content['data'], content['room'])

    elif content['command'] == 'whisper':
        whisper(content['player'], content['data'])
        return

    elif content['command'].lower() in ['move', 'go', 'north', 'south', 'east', 'west', 'n', 's', 'e', 'w', 'out', 'in']:
        content['data'] = content['data'].lower()
        if not content['data']:
            content['data'] = content['command'].lower()
        if content['data'] == 'n':
            content['data'] = 'north'
        if content['data'] == 's':
            content['data'] = 'south'
        if content['data'] == 'e':
            content['data'] = 'east'
        if content['data'] == 'w':
            content['data'] = 'west'
        
        move(player=content['player'], direction=content['data'], room=content['room'])
        return

    elif content['command'] == 'look' or content['command'] == 'l':
        look(player=content['player'], data=content['data'], room=content['room'])
        return

    elif content['command'] == 'test':
        test(content['player'], content['data'])

    elif content['command'] == 'save':
        save(content['player'], content['data'])
    
    elif content['command'] == '@describe':
        set_description(content['player'], content['data'])
        return

    else:
        socketio.emit('event', {'message': 'Sorry, that\'s not a command I currently understand!'}, to=content['player'].session_id)
        return


#This event should be moved to the Character class and using their move method
        
def say(player, data):
    player.speak(data)

def whisper(player, data):
    split = data.split(' ', 1)
    whisper_player = split[0]
    whisper_data = split[1]
    for world_player in events.world.players.values():
        if world_player.name == whisper_player:
            player.whisper(whisper_player=world_player, data=whisper_data)
            return
    socketio.emit('event', {'message': 'That player either doesn\'t exist, or isn\'t currently online.'}, to=player.session_id)

def combat(player, data):
    print(data)
    victim = None
    for victim_player in events.world.players.values():
        if victim_player.name.lower() == data:
            victim = victim_player
            player.combat(victim=victim)
            return
    for victim_npc in events.world.npcs.values():
        new_alias = []
        for alias in victim_npc.aliases:
            new_alias.append(alias.lower())
        if victim_npc.name.lower() == data or data in new_alias:
            victim = victim_npc
            player.combat(victim=victim)
            return
    socketio.emit('event', {'message': f'Woah there killer! I\'m not sure who you\'re trying to attack, but "{data}" certainly isn\'t here. Maybe take out your aggression on a punching bag?'}, to=player.session_id)
    
def inventory_display(player):
    player.inventory_display()

def item_get(player, data, room):
    player.item_get(data, room)

def item_drop(player, data, room):
    player.item_drop(data, room)

def move(player, direction, room):
    player.move(direction=direction, room=room)

#This event should be moved to the Player class and using their look method
def look(player, room, data=''):
    player.look(data=data, room=room)

#These are primarily test functions to make sure the world timer is functional
def test(player, data):
    pass

def save(player, player_id, sid, location, data):
    events.world.world_save()
    events.world.room_save()

def set_description(player, data):
    player.set_description(data)