
var theCrypt;
(function(theCrypt){
    var Views;
    (function(){
        'use strict';

        var adventures = function(){
            return {
                render: function(adventures){
                    var adventuresDiv = document.getElementById("adventures");
                    var adventuresTemplate = document.getElementById("adventureListTemplate").innerHTML;

                    adventuresDiv.innerHTML = Handlebars.compile(adventuresTemplate)(adventures); 
                }
            };
        };

        this.adventures = adventures();
    }).apply(theCrypt.Views || (theCrypt.Views = {}));
})(theCrypt || (theCrypt = {}));