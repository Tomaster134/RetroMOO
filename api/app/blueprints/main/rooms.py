room_dict = {
    (0,0): {
        'name': 'Town Square',
        'description': 'This is the center of town! People flow around you, living in their own quiet worlds. You notice that nobody is making eye contact with you, and some people go out of their way to avoid you.',
        'position': '0,0',
        'exits': {
            'north': '0,1',
            'south': '0,-1',
            'east': '1,0',
            'west': '-1,0'
        },
        'icon': '<span class="map-square" style="background-color:white; color:black">()</span>',
        'ambiance_list': ['People move around you, busy about their day', 'The local town drunk stumbles by, muttering to people nobody sees.']
    },
    (0,1): {
        'name': 'Pavilion',
        'description': 'There is a pavilion here with two buildings to the east and west. The building to the west towers over all the other structures around it, while the building to the east is small and humble, with people congregating outside.',
        'position': '0,1',
        'exits': {
            'south': '0,0',
            'east': '1,1',
            'west': '-1,1'
        },
        'icon': '<span class="map-square" style="background-color:cornsilk; color: black">/\\</span>',
        'ambiance_list': ['You hear a heated argument from the east.', 'A small rodent scurries by your feet.']
    },
    (0,-1): {
        'name': 'Gravel Path',
        'description': 'There is a gravel path here, branching off to the east and west. To the west you see a body of water, to the east trees dominate your view.',
        'position': '0,-1',
        'exits': {
            'north': '0,0',
            'east': '1,-1',
            'west': '-1,-1'
        },
        'icon': '<span class="map-square" style="background-color:gainsboro">||</span>',
        'ambiance_list': ['A rabbit hops past, small and furry.', 'A light breeze stirs your shirt.']
    },
    (1,0): {
        'name': 'Neighborhood',
        'description': 'There are many houses here. All appear locked. You can hear people talking through the thin walls.',
        'position': '1,0',
        'exits': {
            'west': '0,0'
        },
        'icon': '<span class="map-square" style="background-color:lightgreen">_^</span>',
        'ambiance_list': ['A small child wanders past, looking for something.', 'A wagon clatters in the distance.']
    },
    (-1,0): {
        'name': 'Barracks',
        'description': 'Before you lies a squat building, dark and menacing. You notice a small sign posted in front of the walkway inside. It says "COUNTY BARRACKS"',
        'position': '-1,0',
        'exits': {
            'east': '0,0',
            'in': 'Barracks Interior',
        },
        'icon': '<span class="map-square" style="background-color:indianred">Br</span>',
        'ambiance_list': ['The sound of clanging metal and shouts can be faintly heard.', 'A local town guard eyes you, wondering what your business is.']
    },
    'Barracks Interior': {
        'name': 'Barracks Interior',
        'description': 'You stand in front of a circle, the interior of which has straw rushes covering the ground. The smell of sweat and old blood permeates the room. You can faintly see bloodstains beneath the straw.',
        'position': 'Barracks Interior',
        'exits': {
            'out': '-1,0',
        },
        'icon': '<span class="map-square" style="background-color:indianred">BR</span>',
        'ambiance_list': ['Grunts and dull thuds filter through the walls. They must be training new recruits.', 'You catch a whiff of unwashed bodies and dust.']
    },
    (-1,1): {
        'name': 'Mayor\'s Courtyard',
        'description': 'You stand before the mayor\'s house. It is opulent and makes you want to rage against the ruling class.',
        'position': '-1,1',
        'exits': {
            'east': '0,1',
            'in': 'Mayoral Mansion'
        },
        'icon': '<span class="map-square" style="background-color:mintcream; color: black">^^</span>',
        'ambiance_list': ['You can hear a distant wind chime.', 'A man pushing a small hand cart full of groceries hurries by, head bent.']
    },
    (1,1): {
        'name': 'General Store',
        'description': 'A small shop that sells various essential goods. People with nothing better to do with their day are sitting in chairs out front, making small talk.',
        'position': '1,1',
        'exits': {
            'west': '0,1'
        },
        'icon': '<span class="map-square" style="background-color:gray">oo</span>',
        'ambiance_list': ['You can faintly hear someone arguing about the price of goods from inside.', 'You see a group of adolescents making fun of you.']
    },
    (1,-1): {
        'name': 'Forest',
        'description': 'A foreboding forest. You feel the trees pressing down above you, and every noise makes you twitch in fear. A path to the east leads even deeper, but your body feels an almost physical pressure not to proceed.',
        'position': '1,-1',
        'exits': {
            'west': '0,-1',
            'east': '2,-1',
        },
        'icon': '<span class="map-square" style="background-color:olivedrab">Tt</span>',
        'ambiance_list': ['A twig snaps, and your heart jumps.', 'You see a dark shape flit through the trees.']
    },
    (-1,-1): {
        'name': 'Lake',
        'description': 'A placid lake. You feel at peace here. There is a couple rowing a boat in the distance.',
        'position': '-1,-1',
        'exits': {
            'east': '0,-1',
        },
        'icon': '<span class="map-square" style="background-color:mediumblue">~~</span>',
        'ambiance_list': ['Birds chirp overhead.', 'The sound of the lake lapping at the shore make you want to close your eyes.', 'You see one of the people on the rowboat gracefully dive in. They swim about for a minute before clambering back into the boat.']
    },
    'Mayoral Mansion': {
        'name': 'The Mayoral Mansion',
        'description': 'Soaring arches, glass chandeliers, thick rugs. The mayor of this town is clearly not hurting for money.',
        'position': 'Mayoral Mansion',
        'exits': {
            'out': '-1,1',
        },
        'icon': '<span class="map-square" style="background-color:linen">^^</span>',
        'ambiance_list': ['A servant runs past, clearly in hurry.', 'You can hear someone get berated for their poor cleaning job.']
    },
    (2,-1): {
        'name': 'Forest',
        'description': 'The pressure intensifies. You feel like there are eyes watching you everywhere, and not all of them are friendly.',
        'position': '2,-1',
        'exits': {
            'west': '1,-1'
        },
        'icon': '<span class="map-square" style="background-color:olivedrab">Tt</span>',
        'ambiance_list': ['A twig snaps, and your heart jumps.', 'You see a dark shape flit through the trees.', 'An ominious growl can be heard in the distance.']
    },
}

# rooms = {}
# for room in room_dict.values():
#     new_room = Room(room['name'], room['description'], room['position'], room['exits'], room['icon'])
#     rooms.update({new_room.position: new_room})
# with open('app/data/room_db.pkl', 'wb') as dill_file:
#    dill.dump(rooms, dill_file)

# with open('app/data/room_db.pkl', 'rb') as dill_file:
#     rooms = dill.load(dill_file)
# print(rooms)
# print(rooms['0,0'].id, rooms['0,0'].name, rooms['0,0'].description, rooms['0,0'].position, rooms['0,0'].exits, rooms['0,0'].icon, rooms['0,0'].contents)