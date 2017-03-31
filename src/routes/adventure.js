'use strict';

var express = require('express');
var router = express.Router();

var gameBl = require('../app/Business/gameBl');
var repository = require('../app/DAL/gameRepository');

//MAYBE SHOULD BE POST SINCE THE TOKEN HAS TO TRAVEL
router.get("/current-adventures", (req, res, next) => {

});

router.get("/new-adventure", (req, res, next) => {
    repository.getAvailableAdventures().then(adventures => {
        var results = [];

        adventures.forEach(adventure => {
            results.push({"adventure": adventure.Title, "adventureId": adventure.AdventureId});            
        });

        var data = { "adventures": results.slice() };
        
        res.render('newAdventure', data);
    }).catch(err => {
        next(err);
    });
});

router.get("/get-introduction/:adventureId", (req, res, next) => {
    repository.getAdventureDetails(req.params.adventureId).then(adventure => {
        var data = { "adventureDetails": adventure };

        res.json(data);
    }).catch(err => {
        next(err);
    });
});

router.post('/start-new/:adventureId', (req, res, next) => {
    let userId = 1;
    let characterName = "John Doe";

    gameBl.startNewGame(req.params.adventureId, userId, characterName).then(gameId => {  
        res.send({redirect: `adventure/in-progress/${gameId}`});
    });
});

router.get('/in-progress/:gameId', (req, res) => {
    gameBl.getAdventureTemplateData(req.params.gameId).then(game => {
        res.render('adventure', { "title": game.title, "backgroundImage": game.backgroundImage, "tilesBackground": game.tilesBackground });
    }).catch(err => {
        next(err);
    });    
});

/*
router.use('/one/:gameId', (req, res, next) => {
    req.url = `/two/${req.params.gameId}`;
    next();
    
    //if(!res.locals.gameContext) res.locals.gameContext = {};

    //let gameId = req.params.gameId;

    //gameBl.getAdventureTemplateData(gameId).then(game => {
    //    req.gameTitle = game.title;
    //    req.backgroundImage = game.backgroundImage;
    //    req.tilesBackground = game.tilesBackground;
    //    req.url = `/adventure/hardcoded/${gameId}`;
    //    next();
        //res.redirect(307, `/adventure/hardcoded/${gameId}`);
        //console.log(`Title: ${req.gameTitle}\n backgroundImage: ${req.backgroundImage}\n tilesBackground: ${req.tilesBackground}\n`);
    //}).catch(err => {
    //    next(err);
    //});
});

router.get('/two/:gameId', (req, res, next) => {
    console.log("reached hardcoded/:gameId");
    res.send("reached hardcoded/:gameId");
});

//router.get('/:userName/:gameId', (req, res) => {
router.get('/one/:gameId', (req, res) => {
//router.get('/load/:gameId', (req, res) => {
    
    console.log("reached load/:gameId");
    res.send("reached load/:gameId");

    //console.log(`Title: ${req.gameTitle}\n backgroundImage: ${req.backgroundImage}\n tilesBackground: ${req.tilesBackground}\n`);
    //res.render('adventure', { "title": req.gameTitle, "backgroundImage": req.backgroundImage, "tilesBackground": req.tilesBackground });
});
*/

router.post('/restart/:gameId', (req, res) => {
    res.send("restart route");
});

router.delete('/delete/:gameId', (req, res) => {
    res.send("delete route");
});

module.exports = router;