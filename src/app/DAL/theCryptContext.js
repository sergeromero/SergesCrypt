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
    })
}

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

var getParsedFilters = (filters) => {
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
    var filterValues = [];

    if(filters.length !== 0){
        filters.map((f) => {
            filterValues.push(f.value);
        });
    }

    return filterValues;
}

exports.read = function(table, filters, ...fields){
    filters = cleanFilters(filters);
    var parsedFilters = getParsedFilters(filters);
    var parsedFilters = parsedFilters !== "" ? `WHERE ${parsedFilters}` : ""; 
    var filterValues = getFilterValues(filters);

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