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
    
    req.session.userId = 'XCO16OCA5';
    req.session.userName = user;
    res.redirect("/");
});

router.get("/", (req, res, next) => {
    if(req.session.userId){
        res.render("home");
    }
    else
    {
        res.render("login");
    }
});

module.exports = router;