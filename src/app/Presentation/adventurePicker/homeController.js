var theCrypt;
(function(theCrypt){
    var Controllers;
    (function(){
        'use script';

        var home = function(){
            var adventures = [];

            var getAdventures = function(){
                adventures.push({adventure: "Scary Adventure"});
                adventures.push({adventure: "Nice Adventure"});
                adventures.push({adventure: "Terrifying Adventure"});
                adventures.push({adventure: "Exciting Adventure"});

                //var data = JSON.parse(JSON.stringify(adventures));
                var data = { "adventures": adventures.slice() };

                render(data);
            };

            var render = function(adventures){
                const adventuresView = theCrypt.Views.adventures;
                adventuresView.render(adventures);
            };

            return {
                getAdventures: getAdventures
            };
        };

        this.home = home();
    }).apply(theCrypt.Controllers || (theCrypt.Controllers = {}));
})(theCrypt || (theCrypt = {}));