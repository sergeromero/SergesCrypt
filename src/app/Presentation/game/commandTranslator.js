
var theCrypt;
(function(theCrypt){
	var Controllers;
	(function(Controllers){
		var commandTranslator = function(){
			"use strict";
			
			var parseCommand = function(commandString){
				var commandWords = commandString.split(" ");
				
				var command = {
					type: commandWords.shift()
				};
				
				if(command.type === "go" || command.type === "use"){
					command.direction = commandWords.pop();
				}
				
				command.item = commandWords.join(" ");
				
				return command;
			};
			
			var doAction = function(){
				var txtCommand = document.getElementById("txtCommand");
				var commandString = txtCommand.value;
				
				var command = parseCommand(commandString);
				
				theCrypt.Views.message.clear();
				
				switch(command.type){
					case "get":
						theCrypt.Controllers.game.get();
						break;
					case "go":
						theCrypt.Controllers.game.go(command.direction);
						break;
					case "use":
						theCrypt.Controllers.game.use(command.item, command.direction);
						break;
					default:
						theCrypt.Views.message.render("I don't know how to do that!");
						txtCommand.focus();
						return "";
				}
				
				txtCommand.value = "";
				txtCommand.focus();
			};
			
			return {
				doAction: doAction
			};
		};
		
		theCrypt.Controllers.commandTranslator = commandTranslator();
	})(theCrypt.Controllers || (theCrypt.Controllers = {}));
})(theCrypt || (theCrypt = {}));