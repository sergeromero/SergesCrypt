var theCrypt;
(function(theCrypt){
    let Initializers;
    (function(){
        'use strict';

        this.Login = {
            init: function(spinFn){
                let loginButton = document.getElementById("loginButton");
                let registrationButton = document.getElementById('registrationButton');
                loginButton.addEventListener("click", spinFn);
                registrationButton.addEventListener("click", spinFn);
            }
        };
    }).apply(Initializers = theCrypt.Initializers || (theCrypt.Initializers = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;