
var theCrypt;
(function(theCrypt){
	var Map;
	(function(Map){
        'use strict';
        
		this.build = function(mapData){
			var places = {};
			
			var buildPlace = function(placeData){
				var place = new theCrypt.Model.Place(placeData.title, placeData.description);
				
				if(placeData.items !== undefined){
					placeData.items.forEach(place.addItem);
				}
				
				places[placeData.title] = place;
			};
			
			var buildExits = function(placeData){
				var here = places[placeData.title];
				
				if(placeData.exits !== undefined){
					placeData.exits.forEach(function(exit){
						var exitTo = places[exit.to];
						here.addExit(exit.direction, exitTo);
						here.addChallenge(exit.direction, exit.challenge);
					});
				}
			};
			
			mapData.places.forEach(buildPlace);
			mapData.places.forEach(buildExits);
			
			return places[mapData.start];
		};
	}).apply(theCrypt.Map || (theCrypt.Map = {}));
})(theCrypt || (theCrypt = {}));
