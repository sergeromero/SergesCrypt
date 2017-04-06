'use strict';

var express = require('express');
var router = express.Router();



router.post("/register", (req, res, next) => {
    res.send("Register route");
});

router.get("/new-account", (req, res, next) => {
    res.send("new-account route");
});

router.post("/create-account", (req, res, next) => {
    res.send("create-account route");
});

router.post("/authenticate", (req, res, next) => {
    var user = req.body.userName;
    var pwd = req.body.password;

    console.log(`User Name: ${user} and Password: ${pwd}`);
    req.session.trust = 'XCO16OCA5';
    res.send("authenticate route");
});

router.get("/", (req, res, next) => {
    res.render("login");
});

module.exports = router;