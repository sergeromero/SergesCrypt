'use strict';

let context = require('./theCryptContext');

module.exports.getUserByUserName = (userName) => {
    return new Promise((resolve, reject) => {
        let filters = [{key: "UserName", value: userName}];

        return context.read("Users", filters, []).then(result => {
            resolve(result);
        }, err => {
            reject(err);
        });
    });
};

module.exports.isUserNameInUse = (userName) => {
    return new Promise((resolve, reject) => {
        let filters = [{key: "UserName", value: userName}];

        return context.read("Users", filters, [], "count(*) AS userCount").then(result => {
            let userCount = result[0].userCount;
            
            if(userCount === 1){
                resolve(true);
            }
            else{
                resolve(false);
            }
        });
    });
};

module.exports.isEmailInUse = (email) => {
    return new Promise((resolve, reject) => {
        let filters = [{key: "Email", value: email}];

        return context.read("Users", filters, [], "count(*) AS emailCount").then(result => {
            let emailCount = result[0].emailCount;

            if(emailCount === 1){
                resolve(true);
            }
            else{
                resolve(false);
            }
        });
    });
};

module.exports.registerUser = (userName, email, password) => {
    let fields = [];
    fields.push({key: "UserId", value: null});
    fields.push({key: "FirstName", value: ""});
    fields.push({key: "LastName", value: ""});
    fields.push({key: "Email", value: email});
    fields.push({key: "UserName", value: userName});
    fields.push({key: "Password", value: password});

    return context.insert("Users", fields);
};