
var theCrypt;
(function(theCrypt){
    var RAL;
    (function(){
        'use script';

        let HttpRequester = function()
        {
            this.get = (url) => {
                return new Promise((resolve, reject) => {
                    xhr = new XMLHttpRequest();
                    xhr.open('GET', url);

                    xhr.onload = function(){
                        if(xhr.status === 200){
                            resolve(xhr.response);
                        }
                        else{
                            reject(Error(xhr.statusText));
                        }
                    };

                    xhr.onerror = function(){
                        reject(Error('Network Error'));
                    };

                    xhr.send();
                });
            };

            this.post = (url) => {
                return new Promise((resolve, reject) => {
                    xhr = new XMLHttpRequest();
                    xhr.open('POST', url);

                    xhr.onload = function(){
                        if(xhr.status === 200){
                            resolve(xhr.response);
                        }
                        else{
                            reject(Error(xhr.statusText));
                        }
                    };

                    xhr.onerror = function(){
                        reject(Error('Network Error'));
                    };

                    xhr.send();
                });
            };
        };

        this.HttpRequester = HttpRequester;
    }).apply(RAL = theCrypt.RAL || (theCrypt.RAL = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;