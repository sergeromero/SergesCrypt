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
            (AdventureId INTEGER PRIMARY KEY AUTOINCREMENT,
             Title TEXT NOT NULL,
             Description TEXT NOT NULL,
             BackgroundFile TEXT NOT NULL,
             TilesBackgroundFile TEXT NOT NULL)`);
    
    db.run(`CREATE TABLE if not exists Places
            (PlaceId INTEGER PRIMARY KEY,
             AdventureId INTEGER NOT NULL,
             Title TEXT NOT NULL,
             Description TEXT NOT NULL,
             Start INTEGER NOT NULL,
             FOREIGN KEY(AdventureId) REFERENCES Adventures(AdventureId)
            )`);
    
    db.run(`CREATE TABLE if not exists Items
            (ItemId INTEGER PRIMARY KEY,
             Description TEXT NOT NULL,
             TotalUses INTEGER DEFAULT NULL,
             DependantItemId INTEGER DEFAULT NULL,
             FOREIGN KEY(DependantItemId) REFERENCES Items(ItemId))`);

    db.run(`CREATE TABLE if not exists PlaceItems
            (PlaceItemId INTEGER PRIMARY KEY,
             PlaceId INTEGER NOT NULL,
             ItemId INTEGER NOT NULL,
             FOREIGN KEY (PlaceId) REFERENCES Places(PlaceId),
             FOREIGN KEY (ItemId) REFERENCES Items(ItemId)
            )`);
    
    db.run(`CREATE TABLE if not exists PlaceExits
            (PlaceExitId INTEGER PRIMARY KEY,
             PlaceId INTEGER NOT NULL,
             Direction TEXT NOT NULL,
             ToPlaceId INTEGER NOT NULL,
             FOREIGN KEY(PlaceId) REFERENCES Places(PlaceId),
             FOREIGN KEY(ToPlaceId) REFERENCES Places(PlaceId))`);

    db.run(`CREATE TABLE if not exists ExitChallenges
            (ExitChallengeId INTEGER PRIMARY KEY,
             PlaceExitId INTEGER NOT NULL,
             Message TEXT NOT NULL,
             SuccessMessage TEXT NOT NULL,
             FailureMessage TEXT NOT NULL,
             Requires INTEGER NOT NULL,
             ItemConsumed INTEGER NOT NULL,
             Damage INTEGER NOT NULL,
             FOREIGN KEY(PlaceExitId) REFERENCES Places(PlaceId))`);

    db.run(`CREATE TABLE if not exists Users
            (UserId INTEGER PRIMARY KEY,
             FirstName TEXT NOT NULL,
             LastName TEXT NOT NULL,
             Email TEXT NOT NULL,
             UserName TEXT NOT NULL,
             Password TEXT NOT NULL)`);
    
    db.run(`CREATE TABLE if not exists Games
            (GameId INTEGER PRIMARY KEY AUTOINCREMENT,
             UserId INTEGER NOT NULL,
             AdventureId INTEGER NOT NULL,
             CurrentPlaceId INTEGER NOT NULL,
             CharacterName TEXT NOT NULL,
             FOREIGN KEY(GameId) REFERENCES Games(GameId),
             FOREIGN KEY(AdventureId) REFERENCES Adventures(AdventureId),
             FOREIGN KEY(CurrentPlaceId) REFERENCES Places(PlaceId))`);
    
    db.run(`CREATE TABLE if not exists GameItems
            (GameItemId INTEGER PRIMARY KEY,
             GameId INTEGER NOT NULL,
             ItemId INTEGER NOT NULL,
             RemainingUses INTEGER DEFAULT NULL,
             FOREIGN KEY(ItemId) REFERENCES Items(ItemId),
             FOREIGN KEY(GameId) REFERENCES Games(GameId))`);

    db.run(`CREATE TABLE if not exists GamePlaceItems
            (GamePlaceItemId INTEGER PRIMARY KEY,
             GameId INTEGER NOT NULL,
             PlaceId INTEGER NOT NULL,
             GameItemId INTEGER NOT NULL,
             FOREIGN KEY(GameId) REFERENCES Games(GameId),
             FOREIGN KEY(PlaceId) REFERENCES Places(PlaceId),
             FOREIGN KEY(GameItemId) REFERENCES GameItems(GameItemId))`);
    
    db.run(`CREATE TABLE if not exists GameExitChallenges
            (GameExitChallengeId INTEGER PRIMARY KEY,
             GameId INTEGER NOT NULL,
             ExitChallengeId INTEGER NOT NULL,
             Completed INTEGER DEFAULT 0)`);

    //SEED DATA
    let sql = db.prepare('INSERT INTO Adventures VALUES (?, ?, ?, ?, ?)');
    sql.run(null, 'The Dark House', 'A creepy house on top of a hill in the middle of nowhere. Will it be your shelter for tonight, or your doom.', 'house', 'fadedGreenWall');
    sql.run(null, 'The Mysterious Forest', 'As night falls you realize you are lost in the forest. You get a funny feeling something dark and terrible lies in these trees.', 'forest', 'forestTiles');
    sql.run(null, 'The Black Cavern', 'Everybody knows to stay away from this ugly looking place but your friends dared you to enter. Sometimes it is not wise to accept the challenge.', 'cavern', 'cavernTiles');
    //The Alien Planet
    //The Abandoned Spaceship
    sql.finalize();

    //DATA FOR The Dark House PLACES
    sql = db.prepare('INSERT INTO Places VALUES (?, ?, ?, ?, ?)');
    sql.run(null, 1, 'The Kitchen', 'You are in the kitchen. There is a disturbing smell.', 1);
    sql.run(null, 1, 'The Old Library', 'You are in a library. Dusty books line the walls.', 0);
    sql.run(null, 1, 'The Kitchen Garden', 'A large garden with dead trees and strange looking statues everywhere.', 0);
    sql.run(null, 1, 'The Kitchen Cupboard', 'It\'s the cupboard. There are jars with nasty looking contents in the shelves.', 0);
    sql.finalize();

    //DATA FOR The Dark House ITEMS
    sql = db.prepare('INSERT INTO Items VALUES (?, ?, ?, ?)');
    sql.run(null, 'a piece of cheese');
    sql.run(null, 'a rusty key');
    sql.run(null, 'a golden ring');
    sql.run(null, 'a clip of bullets', 10);
    sql.run(null, 'a bottle of crystal liquid');
    sql.run(null, 'holy water');
    sql.run(null, 'pistol', null, 4);
    sql.finalize();

    //DATA FOR The Dark House PLACE ITEMS
    sql = db.prepare('INSERT INTO PlaceItems VALUES (?,?,?)');
    sql.run(null, 1, 1);
    sql.run(null, 2, 2);
    sql.run(null, 3, 3);
    sql.run(null, 3, 4);
    sql.run(null, 4, 5);
    sql.run(null, 4, 6);
    sql.finalize();

    //DATA FOR The Dark House PLACE EXITS
    sql = db.prepare('INSERT INTO PlaceExits VALUES (?, ?, ?, ?)');
    sql.run(null, 1, 'south', 2);
    sql.run(null, 1, 'west', 3);
    sql.run(null, 1, 'east', 4);
    sql.run(null, 2, 'north', 1);
    sql.run(null, 3, 'east', 1);
    sql.run(null, 4, 'west', 1);
    sql.finalize();

    //DATA FOR The Dark House EXIT CHALLENGES
    sql = db.prepare('INSERT INTO ExitChallenges VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    sql.run(null, 1, 'A zombie sinks its teeth into your neck.', 'The zombie disintegrates into a puddle of goo.', 'The zombie is strangely resilient.', 6, 1, 20);
    sql.finalize();

    //DATA FOR USER TABLE
    sql = db.prepare('INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?)');
    sql.run(null, 'Serge', 'Romero', 'serge@email.com', 'sergeromero', 'mypwd');
    sql.finalize();

    db.each('SELECT * FROM Adventures', (err, row) => {
        console.log(`${row.AdventureId}, ${row.Title}, ${row.Description}, ${row.BackgroundFile}, ${row.TilesBackgroundFile}`);
    });
    db.each('SELECT * FROM Places', (err, row) => {
        console.log(`${row.PlaceId}, ${row.AdventureId}, ${row.Title}, ${row.Description}, ${row.Start}`);
    });
    db.each('SELECT * FROM Items', (err, row) => {
        console.log(`${row.ItemId}, ${row.Description}, ${row.TotalUses}, ${row.DependantItemId}`);
    });
    db.each('SELECT * FROM PlaceItems', (err, row) => {
        console.log(`${row.PlaceItemId}, ${row.PlaceId}, ${row.ItemId}`);
    });
    db.each('SELECT * FROM PlaceExits', (err, row) => {
        console.log(`${row.PlaceExitId}, ${row.PlaceId}, ${row.Direction}, ${row.ToPlaceId}`);
    });
    db.each('SELECT * FROM ExitChallenges', (err, row) => {
        console.log(`${row.ExitChallengeId}, ${row.PlaceExitId}, ${row.Message}, ${row.SuccessMessage}, ${row.FailureMessage}, ${row.Requires}, ${row.ItemConsumed}, ${row.Damage}`);
    });
    db.each('SELECT * FROM Users', (err, row) => {
        console.log(`${row.UserId}, ${row.FirstName}, ${row.LastName}, ${row.Email}, ${row.UserName}, ${row.Password}`);
    })
});

db.close();