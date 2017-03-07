'use strict';

var express = require('express');
var router = express.Router();

var gameDal = require('../app/DAL/gameRepository');

router.get('/:gameId', (req, res, next) => {

    gameDal.getGame(0).then(gameData => {
        res.json(gameData);
    }).catch(err => {
        next(err);
    });
});

module.exports = router;