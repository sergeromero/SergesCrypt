'use strict';

var express = require('express');
var router = express.Router();

var playerService = require('../app/player/playerService');
var placeService = require('../app/place/placeService');

router.use('/', (req, res, next) => {
    if(!res.locals.gameContext) res.locals.gameContext = {};

    playerService.getPlayer().then(player => {
        res.locals.gameContext.player = player;
    });

    placeService.getPlace().then(place => {
        res.locals.gameContext.place = place;
    });
    
    next();
});

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;