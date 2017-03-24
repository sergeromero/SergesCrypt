'use strict';

var gameDal = require('../DAL/gameRepository');

exports.startNewGame = (adventureId, userId, characterName) => {
    return gameDal.startNewAdventure(adventureId);
};

exports.loadGameBy = (gameId, userId) => {
    return new Promise((resolve, reject) => {
        return gameDal.getGameBy(gameId).then(gameData => {
            //Build JSON object front end expects.
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

    return result;
});

