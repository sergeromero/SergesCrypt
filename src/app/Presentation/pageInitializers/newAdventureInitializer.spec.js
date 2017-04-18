let jsdom = require('jsdom');

let theCrypt = require('./newAdventureInitializer');

describe('newAdventureInitializer', () => {
    let initializer = theCrypt.Initializers.NewAdventure;
    
    theCrypt.Controllers = {
        newAdventure: {
            getAdventureDetails: function(){}
        }
    };

    beforeEach(() => {
        global.document = jsdom.jsdom('<body></body>');
        global.window = document.defaultView;

        for(let i = 1;i<=5;i++){
            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'adventure';
            radio.value = i;

            document.body.appendChild(radio);
        }

        spyOn(theCrypt.Controllers.newAdventure, 'getAdventureDetails');
    });

    it("sets click event of radio buttons to get adventure details", ()=> {
        initializer.init();

        var radioButtons = document.getElementsByName('adventure');

        radioButtons[2].click();
        expect(theCrypt.Controllers.newAdventure.getAdventureDetails).toHaveBeenCalledWith('3');
    });
});