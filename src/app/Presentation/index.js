var game;
var translator;

$(document).ready(() => {
    'use script';
	game = theCrypt.Controllers.game;
	translator = theCrypt.Controllers.commandTranslator;
	
	var commandButton = document.getElementById("btnCommand");
	commandButton.addEventListener("click", translator.doAction);
	var mapData = {};
	game.init(mapData, "Serge");
});
