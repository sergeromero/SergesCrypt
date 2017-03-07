
var theCrypt;
(function(theCrypt){
	var Views;
	(function(){
		"use strict";
		
		var player = function(){
			return {
				render: function(player){
                    var playerDiv = document.getElementById("player");
                    var playerTemplate = document.getElementById("playerTemplate").innerHTML;

					var data = player.getData();
                    
                    playerDiv.innerHTML = Handlebars.compile(playerTemplate)(data);
				}
			};
		};
		
		this.player = player();
	}).apply(theCrypt.Views || (theCrypt.Views = {}));
})(theCrypt || (theCrypt = {}));