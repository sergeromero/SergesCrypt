'use strict';

var express = require('express');
var router = express.Router();

var gameDal = require('../app/DAL/gameRepository');

router.post('/new-adventure/:adventureId', (req, res, next) => {
    console.log(`Starting a new adventure of id ${req.params.adventureId}`);
            gameDal.getGameBy(43).then(results => {
            //console.log(gameId);
            console.log(results);
        });
/*        
    gameDal.startNewAdventure(req.params.adventureId).then(gameId => {
        gameDal.getGameBy(gameId).then(results => {
            console.log(gameId);
            console.log(results);
        });
    });
    */
    //Redirect to adventure/:gameid 43
});

router.use('/:gameId', (req, res, next) => {
    if(!res.locals.gameContext) res.locals.gameContext = {};

    gameDal.getGame(0).then(game => {
        res.locals.gameContext.player = game.player;
        res.locals.gameContext.place = game.place;
        req.gameTitle = game.title;
        req.backgroundImage = game.backgroundImage;
        req.tilesBackground = game.tilesBackground;
        next();
    }).catch(err => {
        next(err);
    });
});

router.get('/:gameId', (req, res) => {
    res.render('adventure', { "title": req.gameTitle, "backgroundImage": req.backgroundImage, "tilesBackground": req.tilesBackground });
});

module.exports = router;