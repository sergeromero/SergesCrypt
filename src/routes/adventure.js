'use strict';

var express = require('express');
var router = express.Router();

var gameBl = require('../app/Business/gameBl');

router.post('/new-adventure/:adventureId', (req, res, next) => {
    let userId = 1;
    let characterName = "John Doe";

    gameBl.startNewGame(req.params.adventureId, userId, characterName).then(gameId => {  
        res.send({redirect: `adventure/${gameId}`});
    });
});

router.use('/:gameId', (req, res, next) => {
    if(!res.locals.gameContext) res.locals.gameContext = {};

    gameBl.getAdventureTemplateData(req.params.gameId).then(game => {
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