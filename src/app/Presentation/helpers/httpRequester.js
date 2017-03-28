
var theCrypt;
(function(theCrypt){
    var RAL;
    (function(){
        'use script';

        let HttpRequester = function()
        {
            this.get = (url, callback) => {
                let xhr = new XMLHttpRequest();

                xhr.addEventListener('load', callback);

                xhr.open('GET', url);
                xhr.send();
            };

            this.post = (url, callback) => {
                let xhr = new XMLHttpRequest();

                xhr.addEventListener('load', callback);

                xhr.open('POST', url);
                xhr.send();
            };
        };

        this.HttpRequester = HttpRequester;
    }).apply(RAL = theCrypt.RAL || (theCrypt.RAL = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;