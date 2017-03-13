'use strict';

var express = require('express');
var router = express.Router();

var gameDal = require('../app/DAL/gameRepository');

router.use('/', (req, res, next) => {
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

router.get('/', (req, res) => {
    res.render('adventure', { "title": req.gameTitle, "backgroundImage": req.backgroundImage, "tilesBackground": req.tilesBackground });
});

module.exports = router;