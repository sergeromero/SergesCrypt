var context = require('./theCryptContext');

describe('theCryptContext', () =>{
    describe('read', () => {
        
        it('Returns correct sql with no filters and all fields', () => {
            expect(context.read("anyTable")).toBe("SELECT * FROM anyTable");
        });

        it("Returns sql with list of fields", () => {
            const expected = "SELECT one, two, three FROM anyTable";

            expect(context.read("anyTable", undefined, "one", "two", "three")).toBe(expected);
        });

        it("Returns sql with a single filter", () => {
            const expected = "SELECT * FROM anyTable WHERE field = ?"

            var result = context.read("anyTable", [{key: "field", value: "whatever"}]);

            expect(result).toBe(expected);
        });

        it("Returns sql with a multiple filters filter", () => {
            const expected = "SELECT * FROM anyTable WHERE field = ? AND second = ? AND third = ?"

            var result = context.read("anyTable", [{key: "field", value: "whatever"}, {key: "second", value: ""}, {key: "third", value: ""}]);

            expect(result).toBe(expected);
        });
    });
});