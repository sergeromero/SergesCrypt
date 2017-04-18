'use strict';

let sqlite = require('sqlite3').verbose();

let sqlBuilder = require('./sqlStatementBuilder');

let db;

var connectDB = () => {
    return new Promise((resolve, reject) => {
        if(db) return resolve(db);

        var dbFile = "theCrypt.db";

        db = new sqlite.Database(dbFile, sqlite.OPEN_READWRITE, err => {
            if(err) reject(err);
            else resolve(db);
        });
    });
};

exports.read = function(table, filters, joins, ...fields){    
    let sql = sqlBuilder.getSelectSql(table, filters, joins, fields);
    let fieldValues = sqlBuilder.getFieldValues(filters);

    return connectDB().then(() => {
        return new Promise((resolve, reject) => {
            let results = [];
            db.each(sql, fieldValues, (err, row) => {
                if(err) reject(err);
                else results.push(row);
            }, (err, num) => {
                if(err) reject(err);
                else resolve(results);
            });
        });
    });
};

exports.insert = function(table, fields){
    let sql = sqlBuilder.getInsertSql(table, fields);
    let fieldValues = sqlBuilder.getFieldValues(fields);

    return connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.run(sql, fieldValues, err => {
                if(err) reject(err);
                else resolve();
            });
        }).then(() => {
            return getLastInsertedId(table);
        });
    });
};

let getLastInsertedId = (tableName) => {
    return new Promise((resolve, reject) => {
        var query = `SELECT seq FROM sqlite_sequence WHERE name = "${tableName}"`;
        db.get(query, (err, row) =>{
            if(err) reject(err);
            else resolve(row !== undefined ? row.seq : undefined);
        });
    });
};

exports.insertIntoSelect = function(insertTable, selectTable, insertFields, selectFields, filters, joins) {
    let sql = sqlBuilder.getInsertIntoSelect(insertTable, selectTable, insertFields, selectFields, filters, joins);
    let fieldValues = sqlBuilder.getFieldValues(filters);

    return connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.run(sql, fieldValues, err => {
                if(err) reject(err);
                else resolve();
            });
        }).then(() => {
            return getLastInsertedId(insertTable);
        });
    });
};