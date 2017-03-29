

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
    if(!fields || fields.length === 0) return "*";

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

var getInsertFieldNames = (fields) => {
    return fields.map(f => {
        return f.key;
    })
};

var getJoins = (joins) => {
    if(!joins) return "";

    return joins.map(j => {
        return `${j.join} ${j.leftTable} ON ${j.leftTable}.${j.leftField} = ${j.rightTable}.${j.rightField}`;
    }).join(' ');
};

exports.getFieldValues = (filters) => {
    filters = cleanFilters(filters);
    var filterValues = [];

    if(filters.length !== 0){
        filters.map((f) => {
            filterValues.push(f.value);
        });
    }

    return filterValues;
};

exports.getSelectSql = (table, filters, joins, fields) => {
    let parsedFilters = getParsedFilters(filters);
    parsedFilters = parsedFilters !== "" ? `WHERE ${parsedFilters}` : ""; 
    let parsedJoins = getJoins(joins);

    let sql = `SELECT ${getFields(fields)} FROM ${table} 
               ${parsedJoins} 
               ${parsedFilters}`;

    return sql;
};

exports.getInsertSql = (table, fields) => {
    let fieldNames = getInsertFieldNames(fields);
    let fieldPlaceHolders = getFieldPlaceholders(fields);

    let sql =  `INSERT INTO ${table} (${fieldNames}) VALUES (${fieldPlaceHolders});`;

    return sql;
};

exports.getInsertIntoSelect = (insertTable, selectTable, insertFields, selectFields, filters, joins) => {
    let insertFieldNames = getInsertFieldNames(insertFields);
    let selectFieldNames = getInsertFieldNames(selectFields);
    let parsedFilters = getParsedFilters(filters);
    parsedFilters = parsedFilters !== "" ? `WHERE ${parsedFilters}` : "";
    let parsedJoins = getJoins(joins);
    
    let sql =  `INSERT INTO ${insertTable} (${insertFieldNames})
               SELECT ${selectFieldNames} FROM ${selectTable} 
               ${parsedJoins} 
               ${parsedFilters}`;

    return sql;
};