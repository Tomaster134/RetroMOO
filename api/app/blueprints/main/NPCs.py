npc_dict = {
    'Crier': {
        'name': 'Bob, the Town Crier',
        'aliases': ['Bob', 'Crier', 'The Town Crier'],
        'description': 'A young man dressed in common clothing, looking about as if to see who he\'ll announce the latest news to.',
        'location': '0,0',
        'home': '0,0',
        'deceased': False,
        'health': 100,
        'level': 1,
        'ambiance_list': ['The Town Crier yells "Murder in the forest! B\'ware!"', 'The Town Crier yawns and scratches himself.','You hear the Town Crier mutter "Why is it always murder? Nobody ever wants to hear about the ducks."'],
        'can_wander': True,
        'attackable': True,
    },
    'Mayor': {
        'name': 'The Mayor',
        'aliases': ['The Mayor', 'Mayor', 'Boss', 'Head Honcho'],
        'description': 'A truly corpulent man, grown large on the wealth of others. His fingers are clad with more rings than you can count, and his clothing is of the finest make. Honestly, it seems a little overkill.',
        'location': 'Mayoral Mansion',
        'home': 'Mayoral Mansion',
        'deceased': False,
        'health': 200,
        'level': 10,
        'ambiance_list': ['The Mayor snaps at a servant, demanding wine.', 'The Mayor chuckles to himself, at a joke only he knows.', 'The Mayor looks askance at the dirt you tracked in from the outdoors.'],
        'can_wander': False,
        'attackable': True,
    },
     'Mercenary': {
        'name': 'Thor, the Local Mercenary',
        'aliases': ['Merc', 'Mercenary', 'The Local Mercenary', 'Thor', 'Dragonborn'],
        'description': 'A fearsome Emerald Dragonborn, clad in furs. Two wicked axes adorn his back.',
        'location': '-1,0',
        'home': '-1,0',
        'deceased': False,
        'health': 100,
        'level': 1,
        'ambiance_list': ['The Mercenary mutters to himself at your glance, "Newbies never seen dragons blood before?"'],
        'can_wander': False,
        'attackable': True,
    },
    'Snotty Adolescent': {
        'name': 'Billy',
        'aliases': ['billy', 'kid', 'snotty', 'dirty',],
        'description': 'A scrawny teenager, covered in dirt and god knows what else. He\'s currently playing a dead rat. You\'re mildly worried for his mental health.',
        'location': '1,1',
        'home': '1,1',
        'deceased': False,
        'health': 10,
        'level': 1,
        'ambiance_list': ['You see Billy pushing something around in the muck in front of the general store.', 'Billy sticks his tongue out at your and blows a raspberry.', 'Billy runs up to you and wipes his hands on your shirt. Whatever was on his hands certainly isn\'t sanitary.'],
        'can_wander': True,
        'attackable': False,
    },

}