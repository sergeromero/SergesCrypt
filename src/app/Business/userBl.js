'use strict';

var userRepository = require('../DAL/userRepository');

exports.areCredentialsValid = (userName, password) => {
    return new Promise((resolve, reject) => {
        return userRepository.getUserIdBy(userName, password).then(result => {
            if(result.length === 0){
                resolve(false);
            }
            else if (result.length > 1){
                reject('More than one user found with the provided credentials');
            }
            else{
                resolve(result[0].UserId);
            }
        });
    });
};