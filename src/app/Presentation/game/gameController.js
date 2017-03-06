
var theCrypt;
(function(theCrypt){
	var Controllers;
	(function(){
        'use script';

		var game = function(){
			var player;
			var inPlay = false;
			
			var init = function(mapData, playerName){
                //TODO: Make call to back end to get mapData.
				var start = theCrypt.Map.build(mapData);
				
				player = new theCrypt.Model.Player(playerName, 100);
				player.addItem("The Sword of Doom");
				player.setPlace(start);
				
				inPlay = true;
				
				render();
			};
			
			var checkGameStatus = function(){
				if(player.getData().health <= 0){
					inPlay = false;
					
					renderMessage("Overcome by your wounds ...");
					renderMessage("... you fall to the ground.");
					renderMessage(" - Your adventure is over - ");
				}
			};
			
			var render = function(){
				console.clear();
				
				if(inPlay){
					playerView = theCrypt.Views.player;
					placeView = theCrypt.Views.place;
					playerView.render(player);
					placeView.render(player.getPlace());
				}
			};
			
			var renderMessage = function(message){
				theCrypt.Views.message.render(message);
			};
			
			var get = function(){
				if(inPlay){
					var place = player.getPlace();
					var item = place.getLastItem();
					
					if(item !== undefined){
						player.addItem(item);
						
						render();
					}
					else{
						renderMessage("There are no items left in " + place.getData().title);
					}
				}
				else{
					renderMessage("The game is over!");
				}
				
				return "";
			};
			
			var go = function(direction){
				if(inPlay){
					var place = player.getPlace();
					var destination = place.getExit(direction);
					var challenge = place.getChallenge(direction);
					
					if(destination === undefined){
						renderMessage("There is no exit in that direction");
						return "";
					}
					
					if((challenge === undefined) || challenge.complete){
						player.setPlace(destination);
						render();
						return "";
					}
					
					if(challenge.damage){
						player.applyDamage(challenge.damage);
					}
					
					render();
					renderMessage(challenge.message);
					
					checkGameStatus();
				}
				else{
					renderMessage("The game is over!");
				}
				
				return "";
			};
			
			var use = function(item, direction){
				if(inPlay){
					var place = player.getPlace();
					var challenge = place.getChallenge(direction);
					
					if(challenge === undefined || challenge.complete){
						renderMessage("You do not need to use that in there");
						return "";
					}
					
					if(!player.hasItem(item)){
						renderMessage("You do not have " + item);
						return "";
					}
					
					if(item !== challenge.requires){
						renderMessage(challenge.failure);
						return "";
					}
					
					renderMessage(challenge.success);
					challenge.complete = true;
					
					if(challenge.itemConsumed){
						player.removeItem(item);
					}
				}
				else{
					renderMessage("The game is over!");
				}
				
				return "";
			};
			
			return {
				get: get,
				go: go,
				use: use,
				init: init
			};
		};
		
		theCrypt.Controllers.game = game();
	})(theCrypt.Controllers || (theCrypt.Controllers = {}));
})(theCrypt || (theCrypt = {}));