
var theCrypt;
(function(theCrypt){
    var Controllers;
    (function(){
        'use script';

        let constants = theCrypt.Constants;

        var home = function(){
            let httpRequester = new theCrypt.RAL.HttpRequester();

            var getAdventureDetails = function(adventureId){
                const url = `${constants.adventureDetailsUrl}${adventureId}`;
                
                httpRequester.get(url, function(){
                    const details = JSON.parse(this.responseText);
                    
                    theCrypt.Views.newAdventure.render(details);
                });
            };

            var startNewAdventure = function(adventureId){
                const url = `${constants.newAdventureUrl}${adventureId}`;

               httpRequester.post(url, function(){
                    const data = JSON.parse(this.responseText);

                    if(data.redirect){
                        window.location.href = `${constants.homeUrl}${data.redirect}`;
                    }                    
                })
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