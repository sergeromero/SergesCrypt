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

module.exports.getAdventureTemplateData = (gameId) => {
    let joins = [];
    joins.push({join: "INNER JOIN", leftTable: "Games", rightTable: "Adventures", leftField: "AdventureId", rightField: "AdventureId"});

    let fields = ["Adventures.Title AS title", "BackgroundFile AS backgroundImage", "TilesBackgroundFile AS tilesBackground"];

    return context.read("Adventures", [{key: "GameId", value: gameId}], joins, fields);
};

module.exports.getGameBy = (gameId) => {
    let gameFilter = [{key: "Games.GameId", value: gameId}];
    var gameData = {};

    return new Promise((resolve, reject) => {
        let joins = [];
        joins.push({join: "INNER JOIN", leftTable: "Adventures", rightTable: "Games", leftField: "AdventureId", rightField: "AdventureId"});
        joins.push({join: "INNER JOIN", leftTable: "Places", rightTable: "Games", leftField: "PlaceId", rightField: "CurrentPlaceId"});

        let fields = ["Adventures.Title", "BackgroundFile", "TilesBackgroundFile", "Places.Title AS Start", "CharacterName", "CharacterHealth"];
        return context.read("Games", gameFilter, joins, fields).then(results => {
            gameData.game = results[0];
        }).then(results => {
            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "GameItems", rightTable: "GameCharacterItems", leftField: "GameItemId", rightField: "GameItemId"});
            joins.push({join: "INNER JOIN", leftTable: "Items", rightTable: "GameItems", leftField: "ItemId", rightField: "ItemId"});
            
            let fields = ["GameCharacterItemId", "GameItems.GameItemId", "RemainingUses", "Items.Description", "Items.ItemId"];

            return context.read("GameCharacterItems", [{key: "GameCharacterItems.GameId", value: gameId}], joins, fields);
        }).then((results) => {
            gameData.playerItems = results;

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "Games", rightTable: "Places", leftField: "AdventureId", rightField: "AdventureId"});

            return context.read("Places", [{key: "Games.GameId", value: gameId}], joins, ["Places.*"]);
        }).then(results => {
            gameData.places = results;

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "GameItems", rightTable: "GamePlaceItems", leftField: "GameItemId", rightField: "GameItemId"});
            joins.push({join: "INNER JOIN", leftTable: "Items", rightTable: "GameItems", leftField: "ItemId", rightField: "ItemId"});

            let fields = ["GamePlaceItemId", "GamePlaceItems.PlaceId", "GamePlaceItems.GameItemId", "GamePlaceItems.GameId", "Items.Description", "TotalUses", "DependantItemId", "Items.ItemId"];

            return context.read("GamePlaceItems", [{key: "GamePlaceItems.GameId", value: gameId}], joins, fields);
        }).then(results => {
            gameData.placeItems = results;

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "Places", rightTable: "PlaceExits", leftField: "PlaceId", rightField: "PlaceId"});
            joins.push({join: "INNER JOIN", leftTable: "Games", rightTable: "Places", leftField: "AdventureId", rightField: "AdventureId"});

            return context.read("PlaceExits", [{key: "Games.GameId", value: gameId}], joins, "PlaceExits.*");
        }).then(results => {
            gameData.exits = results;

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "PlaceExits", rightTable: "ExitChallenges", leftField: "PlaceExitId", rightField: "PlaceExitId"});
            joins.push({join: "INNER JOIN", leftTable: "Places", rightTable: "PlaceExits", leftField: "PlaceId", rightField: "PlaceId"});
            joins.push({join: "INNER JOIN", leftTable: "Games", rightTable: "Places", leftField: "AdventureId", rightField: "AdventureId"});

            return context.read("ExitChallenges", [{key: "Games.GameId", value: gameId}], joins, "ExitChallenges.*");
        }).then(results => {
            gameData.exitChallenges = results;
            resolve(gameData);
        });
    });
};

module.exports.getAvailableAdventures = () => {
    return new Promise((resolve, reject) => {
        context.read("Adventures", undefined, undefined, "Title", "AdventureId").then(results => {
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

    return new Promise((resolve, reject) => {
        let insertFields = [];
        insertFields.push({key: "UserId", value: ""});
        insertFields.push({key: "AdventureId", value: ""});
        insertFields.push({key: "CurrentPlaceId", value: ""});
        insertFields.push({key: "CharacterName", value: ""});
        insertFields.push({key: "CharacterHealth", value: ""});

        let selectFields = [];
        selectFields.push({key: "1", value: ""});
        selectFields.push({key: adventureId, value: ""});
        selectFields.push({key: "1", value: ""});
        selectFields.push({key: "'John Doe'", value: ""});
        selectFields.push({key: "CharacterStartingHealth", value: ""});

         return context.insertIntoSelect("Games", "Adventures", insertFields, selectFields, adventureIdFilter).then(newGameId => {
            gameId = newGameId;
        }).then(() => {
            //INSERT INTO GAME ITEMS - ITEMS FOUND IN PLACES
            let insertFields = [];
            insertFields.push({key: "ItemId", value: ""});
            insertFields.push({key: "GameId", value: ""});
            insertFields.push({key: "RemainingUses", value: ""});

            let selectFields = [];
            selectFields.push({key: "Items.ItemId", value: ""});
            selectFields.push({key: gameId, value: ""});
            selectFields.push({key: "TotalUses", value: ""});

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "PlaceItems", rightTable: "Items", leftField: "ItemId", rightField: "ItemId"});
            joins.push({join: "INNER JOIN", leftTable: "Places", rightTable: "PlaceItems", leftField: "PlaceId", rightField: "PlaceId"});
            joins.push({join: "INNER JOIN", leftTable: "Adventures", rightTable: "Places", leftField: "AdventureId", rightField: "AdventureId"});

            return context.insertIntoSelect("GameItems", "Items", insertFields, selectFields, adventureIdFilter, joins);
        }).then(() => {
            //INSERT INTO GAME ITEMS - ITEMS WITH WHICH THE CHARACTER STARTS THE ADVENTURE
            let insertFields = [];
            insertFields.push({key: "ItemId", value: ""});
            insertFields.push({key: "GameId", value: ""});
            insertFields.push({key: "RemainingUses", value: ""});

            let selectFields = [];
            selectFields.push({key: "CharacterStartingItems.ItemId", value: ""});
            selectFields.push({key: gameId, value: ""});
            selectFields.push({key: "TotalUses", value: ""});

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "Items", rightTable: "CharacterStartingItems", leftField: "ItemId", rightField: "ItemId"});
            
            return context.insertIntoSelect("GameItems", "CharacterStartingItems", insertFields, selectFields, [{ key: "CharacterStartingItems.AdventureId", value: adventureId}], joins);
        }).then((result) => {
            //INSERT INTO GAME CHARACTER ITEMS
            
            let insertFields = [];
            insertFields.push({key: "GameId", value: ""});
            insertFields.push({key: "GameItemId", value: ""});

            let selectFields = [];
            selectFields.push({key: gameId, value: ""});
            selectFields.push({key: "GameItemId", value: ""});

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "CharacterStartingItems", rightTable: "GameItems", leftField: "ItemId", rightField: "ItemId"});

            return context.insertIntoSelect("GameCharacterItems", "GameItems", insertFields, selectFields, [{ key: "CharacterStartingItems.AdventureId", value: adventureId}, {key: "GameId", value: gameId}], joins);
        }).then(() => {
            //INSERT INTO GAME PLACE ITEMS
            let insertFields = [];
            insertFields.push({key: "GameId", value: ""});
            insertFields.push({key: "PlaceId", value: ""});
            insertFields.push({key: "GameItemId", value: ""});

            let selectFields = [];
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
            let insertFields = [];
            insertFields.push({key: "GameId", value: ""});
            insertFields.push({key: "ExitChallengeId", value: ""});
            insertFields.push({key: "Completed", value: ""});

            let selectFields = [];
            selectFields.push({key: gameId, value: ""});
            selectFields.push({key: "ExitChallengeId", value: ""});
            selectFields.push({key: "0", value: ""});

            let joins = [];
            joins.push({join: "INNER JOIN", leftTable: "PlaceExits", rightTable: "ExitChallenges", leftField: "PlaceExitId", rightField: "PlaceExitId"});
            joins.push({join: "INNER JOIN", leftTable: "Places", rightTable: "PlaceExits", leftField: "PlaceId", rightField: "PlaceId"});

            return context.insertIntoSelect("GameExitChallenges", "ExitChallenges", insertFields, selectFields, [{ key: "Places.AdventureId", value: adventureId}], joins);
        }).then(() => {
            resolve(gameId);
        }).catch(err => {
            reject(err);
        });
    });
};