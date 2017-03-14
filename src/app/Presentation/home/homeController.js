
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

            return {
                getAdventureDetails: getAdventureDetails
            };
        };

        this.home = home();
	}).apply(theCrypt.Controllers || (theCrypt.Controllers = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;