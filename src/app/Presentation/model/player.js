
var theCrypt;
(function(theCrypt){
	var Model;
	(function(Model){
        'use strict';

		var Player = function(name, health){
			var items = [];
			var place = null;
				
			this.addItem = function(item){
				if(typeof item === 'string') {
					item = { "item": item };
				}
				items.push(item);
			};
			
			this.hasItem = function(item){
				return getItemIndexBy(item) !== -1;
			};

			var getItemIndexBy = (value) => {
				return items.map((e) => { return e.item; }).indexOf(value);
			};
			
			this.removeItem = function(item){
				var itemIndex = getItemIndexBy(item);
				if(itemIndex !== -1){
					items.splice(itemIndex, 1);
				}
			};
			
			this.setPlace = function(destination){
				place = destination;
			};
			
			this.getPlace = function(){
				return place;
			};
			
			this.applyDamage = function(damage){
				health = health - damage;
			};
			
			this.getData = function(){
				var data = {
					"name": name,
					"health": health,
					"items": items.slice()
				};
				
				if(place !== null){
					data.place = place.getData().title;
				}
				
				return data;
			};
		};
        
		this.Player = Player;
	}).apply(Model = theCrypt.Model || (theCrypt.Model = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;