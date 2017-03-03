'use strict';

var games = [
    {
        "title": "The Dark House",
        "player": {
            "name": "Serge",
            "health": 180,
            "items": [{item: 'The Sword of Doom'}]
        },
        "place": {
            "title": "The Kitchen",
			"description": "You are in the kitchen. There is a disturbing smell.",
			"items": [ {"item": "a piece of cheese"} ],
            "exits": [
				{ "direction": "south", "to": "The Old Library"	},
				{ "direction": "west", "to": "The Kitchen Garden" },
				{ "direction": "east", "to": "The Kitchen Cupboard" },
			]
        }
    }
];

var getGame = (gameId) => {
    return new Promise((resolve, reject) => {
        resolve(games[gameId]);
    })
};

module.exports.getGame = getGame;