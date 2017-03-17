'use strict';

exports.isEmpty = (obj) => {
    //validate for null and undefined
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};