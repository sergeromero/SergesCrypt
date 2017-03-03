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
        next();
    }).catch(err => {
        next(err);
    });
});

router.get('/', (req, res) => {
    res.render('home', { "title": req.gameTitle });
});

module.exports = router;