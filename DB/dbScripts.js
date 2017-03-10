//TO SEND AN ARGUMENT TO THIS FILE DO node ..\\db\\dbScripts.js arguments
var dbPath = process.argv[2] === undefined ? '' : process.argv[2] + '\\';
dbPath = dbPath + 'theCrypt.db';

console.log(`Start of Database creation ...`);

/*
IF YOU DO NOT WANT TO REFERENCE THE node_modules FOLDER DIRECTLY, YOU CAN CREATE
A js FILE UNDER THE src FOLDER WITH THE FOLLOWING CODE:

module.exports = require('sqlite3');

AND THEN REQUIRE IT IN THIS FILE LIKE SO:

const sqlite = require('../src/customFile');
*/
const sqlite = require('../src/node_modules/sqlite3/sqlite3').verbose();

const db = new sqlite.Database(dbPath);

db.serialize(() => {

    //CREATE TABLES
    db.run(`CREATE TABLE if not exists Adventures
            (AdventureId INTEGER PRIMARY KEY,
             Title TEXT NOT NULL,
             Description TEXT NOT NULL,
             BackgroundFile TEXT NOT NULL,
             TilesBackgroundFile TEXT NOT NULL)`);
    
    db.run(`CREATE TABLE if not exists Places
            (PlaceId INTEGER PRIMARY KEY,
             AdventureId INTEGER,
             Title TEXT NOT NULL,
             Description TEXT NOT NULL,
             FOREIGN KEY(AdventureId) REFERENCES Adventures(AdventureId)
            )`);

    //SEED DATA
    let sql = db.prepare('INSERT INTO Adventures VALUES (?, ?, ?, ?, ?)');
    sql.run(null, 'The Dark House', 'A creepy house on top of a hill in the middle of nowhere. Will it be your shelter for tonight, or your doom.', 'house', 'fadedGreenWall');
    sql.run(null, 'The Mysterious Forest', 'As night falls you realize you are lost in the forest. You get a funny feeling something dark and terrible lies in these trees.', 'forest', 'forestTiles');
    sql.run(null, 'The Black Cavern', 'Everybody knows to stay away from this ugly looking place but your friends dared you to enter. Sometimes it is not wise to accept the challenge.', 'cavern', 'cavernTiles');

    //DATA FOR The Dark House PLACES
    sql = db.prepare('INSERT INTO Places VALUES (?, ?, ?, ?)');
    sql.run(null, 1, 'The Kitchen', 'You are in the kitchen. There is a disturbing smell.');
    sql.run(null, 1, 'The Old Library', 'You are in a library. Dusty books line the walls.');
    sql.run(null, 1, 'The Kitchen Garden', 'A large garden with dead trees and strange looking statues everywhere.');
    sql.run(null, 1, 'The Kitchen Cupboard', 'It\'s the cupboard. There are jars with nasty looking contents in the shelves.');

    //DATA FOR The Dark House PLACE ITEMS

    //DATA FOR The Dark House PLACE EXITS

    //DATA FOR The Dark House EXIT CHALLENGES
    
    sql.finalize();

    db.each('SELECT * FROM Adventures', (err, row) => {
        console.log(`${row.AdventureId}, ${row.Title}, ${row.Description}, ${row.BackgroundFile}, ${row.TilesBackgroundFile}`);
    })
});

db.close();