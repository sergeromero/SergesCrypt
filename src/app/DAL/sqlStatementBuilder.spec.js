var sqlBuilder = require('./sqlStatementBuilder');

describe('sqlStatementBuilder', () =>{
    describe('getSelectSql', () => {
        
        it('Returns correct sql with no filters and all fields', () => {
            expect(sqlBuilder.getSelectSql("anyTable")).toBe("SELECT * FROM anyTable");
        });

        it("Returns sql with list of fields", () => {
            const expected = "SELECT one, two, three FROM anyTable";

            expect(sqlBuilder.getSelectSql("anyTable", undefined, undefined, ["one", "two", "three"])).toBe(expected);
        });

        it("Returns sql with a single filter", () => {
            const expected = "SELECT * FROM anyTable WHERE field = ?";

            var result = sqlBuilder.getSelectSql("anyTable", [{key: "field", value: "whatever"}]);

            expect(result).toBe(expected);
        });

        it("Returns sql with a multiple filters filter", () => {
            const expected = "SELECT * FROM anyTable WHERE field = ? AND second = ? AND third = ?";

            var result = sqlBuilder.getSelectSql("anyTable", [{key: "field", value: "whatever"}, {key: "second", value: ""}, {key: "third", value: ""}]);

            expect(result).toBe(expected);
        });
    });
});