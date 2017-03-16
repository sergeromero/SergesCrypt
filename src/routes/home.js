'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    //TODO: Get these data from the DB.
    var adventures = [];
    adventures.push({adventure: "Awesome Adventure", adventureId: "0"});
    adventures.push({adventure: "Alternate Adventure", adventureId: "1"});
    adventures.push({adventure: "Scary Adventure", adventureId: "2"});
    adventures.push({adventure: "Nice Adventure", adventureId: "3"});
    adventures.push({adventure: "Terrifying Adventure", adventureId: "4"});
    adventures.push({adventure: "Exciting Adventure", adventureId: "5"});

    //var data = JSON.parse(JSON.stringify(adventures));
    var data = { "adventures": adventures.slice() };

    res.render('home', data);
});

router.get('/:adventureId', (req, res) => {
    var adventures = [];
    adventures.push({adventure: "Awesome Adventure", description: "This is an Awesome Adventure", image: "cavern"});
    adventures.push({adventure: "Alternate Adventure", description: "This is an Alternate Adventure", image: "forest"});
    adventures.push({adventure: "Scary Adventure", description: "This is a Scary Adventure", image: "home"});
    adventures.push({adventure: "Nice Adventure", description: "This is a Nice Adventure", image: "house"});
    adventures.push({adventure: "Terrifying Adventure", description: "This is a Terrifying Adventure", image: "cavern"});
    adventures.push({adventure: "Exciting Adventure", description: "This is an Exciting Adventure", image: "forest"});

    var data = { "adventureDetails": adventures[req.params.adventureId] };

    if(JSON.stringify(data) === JSON.stringify({})) throw ("Your adventure was not found.");

    res.json(data);
});

module.exports = router;