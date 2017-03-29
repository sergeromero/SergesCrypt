
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

                theCrypt.CryptSpinner.spin(document.getElementsByTagName("BODY")[0]);
                
                httpRequester.get(url).then(function(response){
                    const details = JSON.parse(response);
                    
                    theCrypt.Views.newAdventure.render(details);

                    theCrypt.CryptSpinner.stop();
                });
            };

            var startNewAdventure = function(adventureId){
                const url = `${constants.newAdventureUrl}${adventureId}`;

                theCrypt.CryptSpinner.spin(document.getElementsByTagName("BODY")[0]);

                httpRequester.post(url).then(function(response){
                    const data = JSON.parse(response);

                    if(data.redirect){
                        window.location.href = `${constants.homeUrl}${data.redirect}`;
                    }

                    theCrypt.CryptSpinner.stop();
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