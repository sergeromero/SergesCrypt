
var theCrypt;
(function(theCrypt){
    var Controllers;
    (function(){
        'use script';

        let constants = theCrypt.Constants;

        var newAdventure = function(){
            let httpRequester = new theCrypt.RAL.HttpRequester();

            var getAdventureDetails = function(adventureId){
                const url = `${constants.getUrl(constants.adventureDetailsUrl)}${adventureId}`;

                theCrypt.CryptSpinner.spin(document.getElementsByTagName("BODY")[0]);
                
                httpRequester.get(url).then(function(response){
                    const details = JSON.parse(response);
                    
                    theCrypt.Views.newAdventure.render(details);

                    theCrypt.CryptSpinner.stop();
                });
            };

            var startNewAdventure = function(adventureId){
                const url = `${constants.getUrl(constants.newAdventureUrl)}${adventureId}`;

                theCrypt.CryptSpinner.spin(document.getElementsByTagName("BODY")[0]);

                httpRequester.post(url).then(function(response){
                    const data = JSON.parse(response);

                    if(data.redirect){
                        window.location.href = `${constants.getUrl()}${data.redirect}`;
                    }

                    theCrypt.CryptSpinner.stop();
                });
            };

            return {
                getAdventureDetails: getAdventureDetails,
                startNewAdventure: startNewAdventure
            };
        };

        this.newAdventure = newAdventure();
	}).apply(theCrypt.Controllers || (theCrypt.Controllers = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;