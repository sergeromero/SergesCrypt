
var theCrypt;
(function(theCrypt){
    var Views;
    (function(){
        'use strict';

        var newAdventure = function(){
            return {
                render: function(adventureDetails){
                    var selectedAdventureDiv = document.getElementById("selected-adventure");
                    var newAdventureTemplate = document.getElementById("newAdventureTemplate").innerHTML;

                    console.log(adventureDetails);

                    selectedAdventureDiv.innerHTML = Handlebars.compile(newAdventureTemplate)(adventureDetails);
                }
            };
        };

        this.newAdventure = newAdventure();
    }).apply(theCrypt.Views || (theCrypt.Views = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;