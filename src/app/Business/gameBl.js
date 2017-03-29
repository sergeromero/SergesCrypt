'use strict';

var gameDal = require('../DAL/gameRepository');

exports.getAdventureTemplateData = (gameId) => {
    return new Promise((resolve, reject) => {
        return gameDal.getAdventureTemplateData(gameId).then(results => {
            resolve(results[0]);
        });
    });
};

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

    d.playerItems.forEach(i => result.player.items.push(i.Description));

    result.places = [];
    d.places.forEach(p => {
        let place = {
            title: p.Title,
            description: p.Description,
            items: [],
            exits: []
        };

        d.placeItems.forEach(i => {
            if(i.PlaceId === p.PlaceId) place.items.push(i.Description);
        });

        d.exits.forEach(e => {
            if(e.PlaceId === p.PlaceId)
            {
                let exit = {};

                exit.direction = e.Direction;
                exit.to = d.places.find(toPlace => e.ToPlaceId === toPlace.PlaceId).Title;

                var challenge = d.exitChallenges.find(ch => ch.PlaceExitId === e.PlaceExitId);
                if(challenge){
                    exit.challenge = {
                        message: challenge.Message,
                        success: challenge.SuccessMessage,
                        failure: challenge.FailureMessage,
                        requires: (d.playerItems.find(pi => challenge.Requires === pi.ItemId) || d.placeItems.find(pi =>  challenge.Requires === pi.ItemId)).Description,
                        itemConsumed: challenge.ItemConsumed,
                        damage: challenge.Damage
                    };
                }

                place.exits.push(exit);
            }
        });

        result.places.push(place);
    });

    return result;
});

