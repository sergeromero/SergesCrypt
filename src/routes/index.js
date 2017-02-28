'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.type('text/plain');
    res.send('This is home for The Crypt');
});

module.exports = router;