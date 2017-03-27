'use strict';

var gameDal = require('../DAL/gameRepository');

exports.startNewGame = (adventureId, userId, characterName) => {
    return gameDal.startNewAdventure(adventureId);
};

exports.loadGameBy = (gameId, userId) => {
    return new Promise((resolve, reject) => {
        return gameDal.getGameBy(gameId).then(gameData => {
            
            let result = toDto(gameData);
            resolve(result);
        });
    });
};

let toDto = (gameData => {
    let d = gameData;
    let result = {};

    result.title = d.game.Title;
    result.backgroundImage = d.game.BackgroundFile;
    result.tilesBackground = d.game.TilesBackgroundFile;
    result.start = d.game.Start;

    result.player = {
        name: d.game.CharacterName,
        health: d.game.CharacterHealth,
        items: []
    };

    gameData.playerItems.forEach(i => result.player.items.push(i.Description));

    result.places = [];
    gameData.places.forEach(p => {
        let place = {
            title: p.Title,
            description: p.Description,
            items: [],
            exits: []
        };

        gameData.placeItems.forEach(i => {if(i.PlaceId === p.PlaceId) place.items.push(i.Description)});
        gameData.exits.forEach(i => {
            let exit = {};

            exit.direction = i.Direction;
            exit.to = gameData.places.find(p => p.PlaceId === i.ToPlaceId).Description;

            place.exits.push(exit);
        });

        result.places.push(place);
    });

    return result;
});

