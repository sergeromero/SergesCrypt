'use strict';

var express = require('express');
var router = express.Router();

var gameBl = require('../app/Business/gameBl');

router.get('/:gameId', (req, res, next) => {
    gameBl.loadGameBy(req.params.gameId).then(gameData => {
        res.json(gameData);
    }).catch(err => {
        next(err);
    });
});

module.exports = router;