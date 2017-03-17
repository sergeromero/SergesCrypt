'use strict';

var express = require('express');
var router = express.Router();

var repository = require('../app/DAL/gameRepository');

router.get('/', (req, res, next) => {
    repository.getAvailableAdventures().then(adventures => {
        var results = [];

        adventures.forEach(adventure => {
            results.push({"adventure": adventure.Title, "adventureId": adventure.AdventureId});            
        });

        //var data = JSON.parse(JSON.stringify(results));
        var data = { "adventures": results.slice() };
        
        res.render('home', data);
    }).catch(err => {
        next(err);
    });
});

router.get('/:adventureId', (req, res, next) => {
    repository.getAdventureDetails(req.params.adventureId).then(adventure => {
        var data = { "adventureDetails": adventure };

        res.json(data);
    }).catch(err => {
        next(err);
    });
});

module.exports = router;