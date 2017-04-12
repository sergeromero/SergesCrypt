'use strict';

module.exports.isAuthenticated = (req, res, next) => {
    if(!req.session.userId){
        req.session.redirectTo = req.originalUrl;
        res.redirect('/');
    }
    else{
        next();
    }    
};