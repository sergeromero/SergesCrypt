var theCrypt;
(function(theCrypt){
    let Initializers;
    (function(){
        'use strict';

        this.NewAdventure = {
            init: function(){
                let radioClick = function(){
                    theCrypt.Controllers.newAdventure.getAdventureDetails(this.value);
                };

                var radioButtons = document.getElementsByName('adventure');

                for(var i = 0;i < radioButtons.length; i++){
                    radioButtons[i].onclick = radioClick;
                }                
            }
        };
    }).apply(Initializers = theCrypt.Initializers || (theCrypt.Initializers = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;