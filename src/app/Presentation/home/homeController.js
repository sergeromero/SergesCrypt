
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
                
                httpRequester.get(url).then(function(response){
                    const details = JSON.parse(response);
                    
                    theCrypt.Views.newAdventure.render(details);
                });
            };

            var startNewAdventure = function(adventureId){
                const url = `${constants.newAdventureUrl}${adventureId}`;

               httpRequester.post(url).then(function(response){
                    const data = JSON.parse(response);

                    if(data.redirect){
                        window.location.href = `${constants.homeUrl}${data.redirect}`;
                    }                    
                });
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