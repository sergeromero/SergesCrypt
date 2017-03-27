'use strict';

var express = require('express');
var router = express.Router();

var gameBl = require('../app/Business/gameBl');

router.post('/new-adventure/:adventureId', (req, res, next) => {
    console.log(`Starting a new adventure of id ${req.params.adventureId}`);

    let userId = 1;
    let characterName = "John Doe";

    res.send({redirect: `/adventure/23`});
/*
    gameBl.startNewGame(req.params.adventureId, userId, characterName).then(gameId => {  
        console.log(`Redirecting with id: ${gameId}`)      
        res.redirect(303, `adventure/${gameId}`);
    });
*/    
});

router.use('/:gameId', (req, res, next) => {
    if(!res.locals.gameContext) res.locals.gameContext = {};

    gameBl.loadGameBy(req.params.gameId).then(game => {
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
    console.log("rendering adventure");
    res.render('adventure', { "title": req.gameTitle, "backgroundImage": req.backgroundImage, "tilesBackground": req.tilesBackground });
});

module.exports = router;