'use strict';

let context = require('./theCryptContext');

module.exports.getUserIdBy = (userName, password) => {
    return new Promise((resolve, reject) => {
        let filters = [{key: "UserName", value: userName}, {key: "Password", value: password}];

        return context.read("Users", filters, [], "UserId").then(result => {
            resolve(result);
        }, err => {
            reject(err);
        });
    });
};