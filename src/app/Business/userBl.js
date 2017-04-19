'use strict';

var userRepository = require('../DAL/userRepository');
var enums = require('../Common/enums');

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

exports.registerUser = (userName, email, password) => {
    return new Promise((resolve, reject) => {
        return userRepository.isUserNameInUse(userName).then(result => {
            if(result){
                return reject(enums.RegistrationResults.UserNameUnavailable);
            }
            else{
                return userRepository.isEmailInUse(email);
            }
        }).then(result => {
            if(result){
                return reject(enums.RegistrationResults.EmailInUse);
            }
            else{
                return resolve(enums.RegistrationResults.Success);
            }
        });
    });
};
