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
}

exports.read = function(table, filters, ...fields){
    var parsedFilters = "";
    var filterValues = [];

    filters = cleanFilters(filters);
    if(filters.length !== 0){
        parsedFilters = "WHERE " + (function(){
            var result = [];

            filters.map((e) => {
                var filter = [e.key, "?"].join(" = ");
                result.push(filter);
                filterValues.push(e.value);
            });

            return result.join(" AND ");
        })();
    }

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