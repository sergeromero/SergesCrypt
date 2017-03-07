var game;
var translator;

/*
window.onload = function(){
    'use script';
	game = theCrypt.Controllers.game;
	translator = theCrypt.Controllers.commandTranslator;
	
	var commandButton = document.getElementById("btnCommand");
	commandButton.addEventListener("click", translator.doAction);
	
	game.init(mapData, "Serge");
};
*/
$(document).ready(() => {
    'use script';
	game = theCrypt.Controllers.game;
	translator = theCrypt.Controllers.commandTranslator;
	
	var commandButton = document.getElementById("btnCommand");
	commandButton.addEventListener("click", translator.doAction);
	var mapData = {};
	game.init(mapData, "Serge");
});
