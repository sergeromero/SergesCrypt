'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var adventures = [];
    adventures.push({adventure: "Awesome Adventure"});
    adventures.push({adventure: "Alternate Adventure"});
    adventures.push({adventure: "Scary Adventure"});
    adventures.push({adventure: "Nice Adventure"});
    adventures.push({adventure: "Terrifying Adventure"});
    adventures.push({adventure: "Exciting Adventure"});

    //var data = JSON.parse(JSON.stringify(adventures));
    var data = { "adventures": adventures.slice() };

    res.render('home', data);
});

module.exports = router;