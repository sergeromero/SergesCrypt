var game;
var translator;

//Change to jquery document(ready)
window.onload = function(){
    'use script';
	game = theCrypt.Controllers.game;
	translator = theCrypt.Controllers.commandTranslator;
	
	var commandButton = document.getElementById("btnCommand");
	commandButton.addEventListener("click", translator.doAction);
	
	game.init(mapData, "Serge");
};
