
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

                    selectedAdventureDiv.innerHTML = Handlebars.compile(newAdventureTemplate)(adventureDetails);

                    var btn = document.getElementById('btnCommand');
                    btn.addEventListener("click", function(){
                        var adventureId = document.getElementById('adventureId').value;
                        
                        theCrypt.Controllers.home.startNewAdventure(adventureId);
                    });
                }
            };
        };

        this.newAdventure = newAdventure();
    }).apply(theCrypt.Views || (theCrypt.Views = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;