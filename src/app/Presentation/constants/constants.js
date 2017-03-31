
var theCrypt;
(function(theCrypt){
    var Constants;
    (function(){
        'use script';

        this.newAdventureUrl = 'http://localhost:3033/adventure/start-new/';
        this.adventureDetailsUrl = 'http://localhost:3033/adventure/get-introduction/';
        this.homeUrl = 'http://localhost:3033/';
        this.gameUrl = 'http://localhost:3033/game/';

    }).apply(theCrypt.Constants || (theCrypt.Constants = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;