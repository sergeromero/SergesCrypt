var getPlayer = () => {
    return new Promise((resolve, reject) => {
        resolve({
            "name": "Sergio",
            "health": 150,
            "items": [{item: 'The Sword of Doom'}]
        });
    });
};

module.exports.getPlayer = getPlayer;