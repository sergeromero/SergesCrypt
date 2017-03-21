'use strict';

var sqlite = require('sqlite3').verbose();

let db;

var connectDB = () => {
    return new Promise((resolve, reject) => {
        if(db) return resolve(db);

        var dbFile = "theCrypt.db"

        db = new sqlite.Database(dbFile, sqlite.OPEN_READWRITE, err => {
            if(err) reject(err);
            else resolve(db);
        });
    });
};

var cleanFilters = (filters) => {
    if(filters === undefined) return [];
    if(filters.constructor !== Array) return [];

    return getValidFilters(filters);
};

var getValidFilters = (filters) => {
    return filters.filter(filter => {
        return filter.key !== undefined && filter.value !== undefined;
    });
};

var getFields = (fields) => {
    if(fields.length === 0) return "*";

    return fields.join(", ");
};

var getFieldPlaceholders = (fields) => {
    return fields.map(f => {
        return "?";
    })
};

var getParsedFilters = (filters) => {
    filters = cleanFilters(filters);
    var parsedFilters = "";

    if(filters.length !== 0){
        var result = [];

        filters.map((f) => {
            var filter = [f.key, "?"].join(" = ");
            result.push(filter);
        });

        parsedFilters = result.join(" AND ");
    }
    
    return parsedFilters;
};

var getFilterValues = (filters) => {
    filters = cleanFilters(filters);
    var filterValues = [];

    if(filters.length !== 0){
        filters.map((f) => {
            filterValues.push(f.value);
        });
    }

    return filterValues;
};

var getInsertFieldNames = (fields) => {
    return fields.map(f => {
        return f.key;
    })
};

var getJoins = (joins) => {
    return joins.map(j => {
        return `${j.join} ${j.leftTable} ON ${j.leftTable}.${j.leftField} = ${j.rightTable}.${j.rightField}`;
    }).join(' ');
};

exports.read = function(table, filters, ...fields){    
    let parsedFilters = getParsedFilters(filters);
    parsedFilters = parsedFilters !== "" ? `WHERE ${parsedFilters}` : ""; 
    let filterValues = getFilterValues(filters);

    let sql = `SELECT ${getFields(fields)} FROM ${table} ${parsedFilters}`;

    return connectDB().then(() => {
        return new Promise((resolve, reject) => {
            let results = [];
            db.each(sql, filterValues, (err, row) => {
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
    let fieldValues = getFilterValues(fields);
    let fieldNames = getInsertFieldNames(fields);
    let fieldPlaceHolders = getFieldPlaceholders(fields);

    let sql = `INSERT INTO ${table} (${fieldNames}) VALUES (${fieldPlaceHolders});`;

    return connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.run(sql, fieldValues, err => {
                if(err) reject(err);
                else resolve();
            });
        }).then(() => {
            return new Promise((resolve, reject) => {
                var query = `SELECT seq FROM sqlite_sequence WHERE name = "${table}"`;
                db.get(query, (err, row) =>{
                    if(err) reject(err);
                    else resolve(row !== undefined ? row.seq : undefined);
                });
            });
        });
    });
};

exports.insertIntoSelect = function(insertTable, selectTable, insertFields, selectFields, filters, joins) {
    let insertFieldNames = getInsertFieldNames(insertFields);
    let selectFieldNames = getInsertFieldNames(selectFields);
    let parsedFilters = getParsedFilters(filters);
    parsedFilters = parsedFilters !== "" ? `WHERE ${parsedFilters}` : "";
    let filterValues = getFilterValues(filters);
    let parsedJoins = getJoins(joins);
    
    let sql = `INSERT INTO ${insertTable} (${insertFieldNames})
                SELECT ${selectFieldNames} FROM ${selectTable} 
                ${parsedJoins} 
                 ${parsedFilters}`;
                 
    return connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.run(sql, filterValues, err => {
                if(err) { console.log(`Rejected with: ${err}`);reject(err);}
                else {console.log("Resolved");resolve();}
            });
        });
    });
};