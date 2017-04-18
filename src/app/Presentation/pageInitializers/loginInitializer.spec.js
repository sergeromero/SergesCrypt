let jsdom = require('jsdom');

let theCrypt = require('./loginInitializer');

describe('loginInitializer', () => {
    let initializer = theCrypt.Initializers.Login;
    let spinSpy;
    
    beforeEach(() => {
        global.document = jsdom.jsdom('<body><button id="loginButton" type="submit"></button><button id="registrationButton" type="submit"></button></body>');
        global.window = document.defaultView;

        spinSpy = {
            spin: function(){}
        };

        spyOn(spinSpy, 'spin');
    });

    it("Sets click event of login button to start the spinner", () => {
        initializer.init(spinSpy.spin);

        let loginButton = document.getElementById("loginButton");
        loginButton.click();

        expect(spinSpy.spin).toHaveBeenCalled();
    });

    it("Sets click event of registration button to start the spinner", () => {
        initializer.init(spinSpy.spin);

        let registrationButton = document.getElementById("registrationButton");
        registrationButton.click();

        expect(spinSpy.spin).toHaveBeenCalled();
    });
});