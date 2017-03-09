
var theCrypt;
(function(theCrypt){
	var Views;
	(function(Views){
		"use strict";
		
		var place = function(){	
			return {
				render: function(place){
                    var placesDiv = document.getElementById("place");
                    var placeTemplate = document.getElementById("placeTemplate").innerHTML;
                    
					var data = place.getData();
					
					data.items = data.items.map(function(itemName){
						return { item: itemName };
					});
					
					data.exits = data.exits.map(function(exitName){
						return { exit: exitName };
					});
					
					placesDiv.innerHTML = Handlebars.compile(placeTemplate)(data);
				}
			};
			
		};
        
        this.place = place();
	}).apply(theCrypt.Views || (theCrypt.Views = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;