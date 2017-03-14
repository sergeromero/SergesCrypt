
$(document).ready(() => {
    'use strict';

    var radioButtons = document.getElementsByName('adventure')
    
    for(var i = 0;i < radioButtons.length; i++){
        radioButtons[i].onclick = function()
        {
            theCrypt.Controllers.home.getAdventureDetails(this.value);
        };
    }
});