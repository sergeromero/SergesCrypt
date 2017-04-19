'use strict';

let express = require('express');
let router = express.Router();

let userBl = require('../app/Business/userBl');
var enums = require('../app/Common/enums');

router.post("/register", (req, res, next) => {
    let user = req.body.newUserName;
    let pwd = req.body.newPassword;
    let email = req.body.email;

    userBl.registerUser(user, email, pwd).then(result => {
        res.send('Result from BL: ' + result);
    }, result => {
        if(result === enums.RegistrationResults.UserNameUnavailable){
            req.session.invalidRegistration = true;
            req.session.message = "This user name is no longer available. Please choose another one.";
            res.redirect('/');
        }
        else if(result === enums.RegistrationResults.EmailInUse){
            req.session.invalidRegistration = true;
            req.session.message = "There is already an account associated with this email.";
            res.redirect('/');
        }
        else
        {
            res.send(message);
        }
    });
});

router.get("/new-account", (req, res, next) => {
    res.send("new-account route");
});

router.post("/create-account", (req, res, next) => {
    res.send("create-account route");
});

router.post("/authenticate", (req, res, next) => {
    let user = req.body.userName;
    let pwd = req.body.password;
    let redirectTo = req.session.redirectTo;
    delete req.session.redirectTo;

    userBl.areCredentialsValid(user, pwd).then(result => {
        if(result){
            req.session.userId = result;
            req.session.userName = user;
        }
        else{
            req.session.failedAuthentication = true;
        }
        
        res.redirect(redirectTo ? redirectTo : '/');
    });
});

router.get("/", (req, res, next) => {
    if(req.session.userId){
        res.render("home");
    }
    else if(req.session.invalidRegistration){
        let invalidRegistration = req.session.invalidRegistration;
        let message = req.session.message;

        delete req.session.invalidRegistration;
        delete req.session.message;

        res.render("login", {
            failedRegistrationMessageClass : invalidRegistration ? 'show' : 'hide', 
            "registrationErrorMessage": message,
            failedAuthMessageClass: 'hide'
        });
    }
    else
    {
        let failedAuthentication = req.session.failedAuthentication;
        delete req.session.failedAuthentication;
        res.render("login", { 
            failedAuthMessageClass: failedAuthentication ? 'show' : 'hide',
            failedRegistrationMessageClass: 'hide'
        });
    }
});

module.exports = router;