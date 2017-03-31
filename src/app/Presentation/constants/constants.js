
var theCrypt;
(function(theCrypt){
    var Constants;
    (function(){
        'use script';

        this.newAdventureUrl = 'adventure/start-new/';
        this.adventureDetailsUrl = 'adventure/get-introduction/';
        this.gameUrl = 'game/';

        this.getUrl = (url) => {
            let location = window.location;
            return `${location.protocol}//${location.host}/${url ? url : ""}`;
        };        

    }).apply(theCrypt.Constants || (theCrypt.Constants = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;