'use strict';

let express = require('express');
let router = express.Router();

let userBl = require('../app/Business/userBl');

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

    userBl.areCredentialsValid(user, pwd).then(result => {
        if(result){
            req.session.userId = result;
            req.session.userName = user;
        }

        res.redirect("/");
    });
});

router.get("/", (req, res, next) => {
    if(req.session.userId){
        res.render("home");
    }
    else
    {
        ///TODO: Set message for failed authentication attempt. Use handlebars for this.
        res.render("login");
    }
});

module.exports = router;