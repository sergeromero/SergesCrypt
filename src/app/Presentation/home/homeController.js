
var theCrypt;
(function(theCrypt){
    var Controllers;
    (function(){
        'use script';

        var home = function(){
            var getAdventureDetails = function(adventureId){
                var xhr = new XMLHttpRequest();
                var url = `http://localhost:3033/${adventureId}`;

                xhr.addEventListener("load", () => {
                    var details = JSON.parse(xhr.responseText);
                    
                    theCrypt.Views.newAdventure.render(details);
                });
                xhr.open("GET", url);
				xhr.send();
            };

            var startNewAdventure = function(adventureId){
                var xhr = new XMLHttpRequest();
                var url = `http://localhost:3033/adventure/new-adventure/${adventureId}`;

                xhr.open('POST', url);
                xhr.send();
            };

            return {
                getAdventureDetails: getAdventureDetails,
                startNewAdventure: startNewAdventure
            };
        };

        this.home = home();
	}).apply(theCrypt.Controllers || (theCrypt.Controllers = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;