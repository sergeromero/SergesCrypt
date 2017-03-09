
var theCrypt = require('./player');

describe('Player model', () => {
    let player;
    let anyHealth;
    let anyName;

    beforeEach(() => {
        anyHealth = 100;
        anyName = "anyName";
        player = new theCrypt.Model.Player(anyName, anyHealth);
    });

    it('Verifies a player model has been created', () => {
        expect(player).not.toBe(undefined);
    });

    it("Gets the player's name and health", () => {
        const playerData = player.getData();

        expect(playerData.name).toBe(anyName);
        expect(playerData.health).toBe(anyHealth);
    });

    describe("addItem", () => {
        it("Adds a string item to the player", () => {
            const anyItem = "a string item";
            player.addItem(anyItem);

            const playerData = player.getData();
            
            expect(playerData.items.length).toBe(1);
            expect(playerData.items[0].item).toBe(anyItem);
        });

        it("Adds an item object to the player", () => {
            const anyItem = { "item": "an item" };
            player.addItem(anyItem);

            const playerData = player.getData();

            expect(playerData.items.length).toBe(1);
            expect(playerData.items[0].item).toBe(anyItem.item);
        });
    });

    describe("hasItem", () => {
        const itemOne = "item One";
        const itemTwo = "item Two";
        const itemThree = "item Three";

        beforeEach(() => {
            player.addItem(itemOne);
            player.addItem(itemThree);
        });

        it("Returns true when player has item", () => {
            expect(player.hasItem(itemOne)).toBeTruthy();
            expect(player.hasItem(itemThree)).toBeTruthy();
        });

        it("Returns false when player does not have item", () => {
            expect(player.hasItem(itemTwo)).toBeFalsy();
        });
    });

    describe("removeItem", () => {
        const itemOne = "item One";
        const itemTwo = "item Two";
        const itemThree = "item Three";

        beforeEach(() => {
            player.addItem(itemOne);
            player.addItem(itemThree);

            expect(player.getData().items.length).toBe(2);
        });

        it("Removes an existing item", () => {
            player.removeItem(itemOne);

            const data = player.getData();

            expect(data.items.length).toBe(1);
            expect(data.items[0].item).toBe(itemThree);
            expect(player.hasItem(itemOne)).toBeFalsy();
        });

        it("Is unafected when trying to remove an unexisting item", () => {
            expect(player.hasItem(itemTwo)).toBeFalsy();

            player.removeItem(itemTwo);
            const data = player.getData();

            expect(data.items.length).toBe(2);
            expect(data.items[0].item).toBe(itemOne);
            expect(data.items[1].item).toBe(itemThree);
            expect(player.hasItem(itemTwo)).toBeFalsy();
        });
    });

    describe("setPlace", () => {
        it("does not include a place if it has not been set", () => {
            const data = player.getData();

            expect(data.place).toBe(undefined);
        });

        it("has a place once it has been set", () => {
            const anyPlaceTitle = "any place title";
            const anyPlace = { getData: () => { }};
            
            spyOn(anyPlace, "getData").and.returnValue({ title: anyPlaceTitle });

            player.setPlace(anyPlace);

            const data = player.getData();

            expect(anyPlace.getData).toHaveBeenCalled();
            expect(data.place).toBe(anyPlaceTitle);
        });

        it("returns the place that has been set", () => {
            expect(player.getPlace()).toBe(null);
            const anyPlace = "any place";

            player.setPlace(anyPlace);

            expect(player.getPlace()).toBe(anyPlace);
        });
    });

    describe("applyDamage", () => {
        it("applies the damage amount to the player's health", () => {
            let data = player.getData();
            expect(data.health).toBe(anyHealth);
            const anyDamage = 30;

            player.applyDamage(anyDamage);

            data = player.getData();

            expect(data.health).toBe(anyHealth - anyDamage);
        });
    });
});