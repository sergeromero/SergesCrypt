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

module.exports.isUserNameInUse = (userName) => {
    return new Promise((resolve, reject) => {
        if(userName === 'test'){
            resolve(true);
        }
        else{
            resolve(false);
        }
    });
};

module.exports.isEmailInUse = (email) => {
    return new Promise((resolve, reject) => {
        if(email === 'test'){
            resolve(true);
        }
        else{
            resolve(false);
        }
    });
};