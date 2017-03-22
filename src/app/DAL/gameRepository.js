'use strict';

var games = [
    {
        "title": "The Dark House",
        "backgroundImage": "house",
        "tilesBackground": "fadedGreenWall",
	    "start":	"The Kitchen",
        "player": {
            "name": "Serge",
            "health": 180,
            "items": [{item: 'The Sword of Doom'}]
        },
        "places": [
            {
                "title": "The Kitchen",
                "description": "You are in the kitchen. There is a disturbing smell.",
                "items": [ "a piece of cheese" ],
                "exits": [
                    { 
                        "direction": "south", 
                        "to": "The Old Library" ,
                        "challenge": {
                            "message": "A zombie sinks its teeth into your neck.",
                            "success": "The zombie disintegrates into a puddle of goo.",
                            "failure": "The zombie is strangely resilient.",
                            "requires": "holy water",
                            "itemConsumed": true,
                            "damage": 20
                        }
                    },
                    { "direction": "west", "to": "The Kitchen Garden" },
                    { "direction": "east", "to": "The Kitchen Cupboard" },
                ]
            },
            {
                "title": "The Old Library",
                "description": "You are in a library. Dusty books line the walls.",
                "items": [ "a rusty key" ],
                "exits": [
                    { "direction": "north", "to": "The Kitchen"}
                ]
            },
            {
                "title": "The Kitchen Garden",
                "description": "A large garden with dead trees and strange looking statues everywhere.",
                "items": [ "a golden ring", "a clip of bullets"],
                "exits": [
                    { "direction": "east", "to": "The Kitchen"}
                ]
            },
            {
                "title": "The Kitchen Cupboard",
                "description": "It's the cupboard. There are jars with nasty looking contents in the shelves",
                "items": [ "a bottle of crystal liquid", "holy water" ],
                "exits": [
                    { "direction": "west", "to": "The Kitchen"}
                ]
            },
        ]
    }
];

var context = require('./theCryptContext');

var getGame = (gameId) => {
    return new Promise((resolve, reject) => {
        resolve(games[gameId]);
    });
};

module.exports.getGame = getGame;

module.exports.getAvailableAdventures = () => {
    return new Promise((resolve, reject) => {
        context.read("Adventures", undefined, "Title", "AdventureId").then(results => {
            resolve(results);
        }, err => {
            reject(err);
        });
    });
};

module.exports.getAdventureDetails = (adventureId) => {
    return new Promise((resolve, reject) => {
        context.read("Adventures", [{ key: "AdventureId", value: adventureId}]).then(results => {
            if(results.length === 0) throw `No adventure was found with id ${adventureId}`;
            else resolve(results[0]);
        }, err => {
            reject(err);
        });
    });
};

module.exports.startNewAdventure = (adventureId) => {
    let adventureIdFilter = [{ key: "Adventures.AdventureId", value: adventureId}];
    let gameId;
    let insertFields = [];
    insertFields.push({key: "GameId", value: null});
    insertFields.push({key: "UserId", value: "1"});
    insertFields.push({key: "AdventureId", value: adventureId});
    insertFields.push({key: "CurrentPlaceId", value: "1"});
    insertFields.push({key: "CharacterName", value: "John Doe"});

    return new Promise((resolve, reject) => {
        context.insert("Games", insertFields).then(newGameId => {
            gameId = newGameId;
        }).then(() => {
            //INSERT INTO GAME ITEMS
            let insertFields = [];
            insertFields.push({key: "GameItemId", value: ""});
            insertFields.push({key: "ItemId", value: ""});
            insertFields.push({key: "GameId", value: ""});
            insertFields.push({key: "RemainingUses", value: ""});

            let selectFields = [];
            selectFields.push({key: "null", value: ""});
            selectFields.push({key: "Items.ItemId", value: ""});
            selectFields.push({key: gameId, value: ""});
            selectFields.push({key: "TotalUses", value: ""});

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "PlaceItems", rightTable: "Items", leftField: "ItemId", rightField: "ItemId"});
            joins.push({join: "INNER JOIN", leftTable: "Places", rightTable: "PlaceItems", leftField: "PlaceId", rightField: "PlaceId"});
            joins.push({join: "INNER JOIN", leftTable: "Adventures", rightTable: "Places", leftField: "AdventureId", rightField: "AdventureId"});

            return context.insertIntoSelect("GameItems", "Items", insertFields, selectFields, adventureIdFilter, joins);
        }).then(() => {
            //INSERT INTO GAME PLACE ITEMS
            let insertFields = [];
            insertFields.push({key: "GamePlaceItemId", value: ""});
            insertFields.push({key: "GameId", value: ""});
            insertFields.push({key: "PlaceId", value: ""});
            insertFields.push({key: "GameItemId", value: ""});

            let selectFields = [];
            selectFields.push({key: "null", value: ""});
            selectFields.push({key: gameId, value: ""});
            selectFields.push({key: "Places.PlaceId", value: ""});
            selectFields.push({key: "GameItemId", value: ""});

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "PlaceItems", rightTable: "GameItems", leftField: "ItemId", rightField: "ItemId"});
            joins.push({join: "INNER JOIN", leftTable: "Places", rightTable: "PlaceItems", leftField: "PlaceId", rightField: "PlaceId"});
            joins.push({join: "INNER JOIN", leftTable: "Adventures", rightTable: "Places", leftField: "AdventureId", rightField: "AdventureId"});

            let gamePlaceItemsFilters = [adventureIdFilter[0], {key: "GameItems.GameId", value: gameId}];
            
            return context.insertIntoSelect("GamePlaceItems", "GameItems", insertFields, selectFields, gamePlaceItemsFilters, joins);
        }).then(() => {
            //INSERT INTO GAME EXIT CHALLENGES
            return context.read("GamePlaceItems",[{key: "GameId", value: gameId}]).then((rows) => {
                resolve(rows);
            });
        }).catch(err => {
            reject(err);
        });
    });
};