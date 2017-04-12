'use strict';

let express = require('express');
let router = express.Router();

router.use((req, res, next) => {
    if(!req.session.userId){
        res.redirect('/');
    }
    else{
        next();
    }
});

module.exports = router;