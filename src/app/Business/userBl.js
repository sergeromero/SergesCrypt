'use strict';

let bcrypt = require('bcryptjs');

let userRepository = require('../DAL/userRepository');
let enums = require('../Common/enums');

exports.areCredentialsValid = (userName, password) => {
    return new Promise((resolve, reject) => {
        return userRepository.getUserByUserName(userName).then(result => {
            if(result.length === 0){
                reject("Unknown user name.");
            }
            else if (result.length > 1){
                throw new Error('More than one user found with the provided credentials');
            }
            else if(!bcrypt.compareSync(password, result[0].Password)){            
                reject("Password invalid.");
            }
            else {
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
                let hashedPwd = bcrypt.hashSync(password, 10);

                return userRepository.registerUser(userName, email, hashedPwd);
            }
        }).then(result => {
            resolve(result);
        });
    });
};
