
var theCrypt;
(function(theCrypt){
    var Constants;
    (function(){
        'use script';

        this.newAdventureUrl = 'http://localhost:3033/adventure/new-adventure/';
        this.adventureDetailsUrl = 'http://localhost:3033/';
        this.homeUrl = 'http://localhost:3033/';
        this.gameUrl = 'http://localhost:3033/game/';

    }).apply(theCrypt.Constants || (theCrypt.Constants = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;