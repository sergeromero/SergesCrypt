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
        else{
            req.session.failedAuthentication = true;
        }

        res.redirect("/");
    });
});

router.get("/", (req, res, next) => {
    //console.log('in the home route');
    let failedAuthentication = req.session.failedAuthentication;
    delete req.session.failedAuthentication;

    if(req.session.userId){
        res.render("home");
    }
    else
    {
        res.render("login", { failedAuthMessageClass: failedAuthentication ? 'show' : 'hide'});
    }
});

module.exports = router;