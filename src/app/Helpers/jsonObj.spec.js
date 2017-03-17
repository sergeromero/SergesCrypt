var helper = require('./jsonObj');

describe('jsonObj', () => {
    describe('isEmpty', () => {
        it('Returns true when object is empty', () => {
            var obj = {};

            expect(helper.isEmpty(obj)).toBeTruthy();
        });

        it('Returns false when object has one property', () => {
            var obj = {key: ""};

            expect(helper.isEmpty(obj)).toBeFalsy();
        });
/*
        it('Throws error is argument is not a JSON object', () => {
            expect(helper.isEmpty("some string")).toBeFalsy();
        });

        it('Throws error if argument is undefined', () => {
            expect(helper.isEmpty(undefined)).toBeFalsy();
        });
*/        
    });
});