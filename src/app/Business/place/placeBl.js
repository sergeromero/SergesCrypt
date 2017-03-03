
var mapData = {
	"title":	"The Dark House",
	"start":	"The Kitchen",
	"places": [
		{
			"title": "The Kitchen",
			"description": "You are in the kitchen. There is a disturbing smell.",
			"items": [ {"item": "a piece of cheese"} ],
			"exits": [
				{ 
					"direction": "south", 
					"to": "The Old Library" ,
					"challenge": {
						"message": "A zombie sinks its teeth into your neck.",
						"success": "The zombie disintegrates into a puddle of goo.",
						"failure": "The zombie is strangely resilient.",
						"requires": "holy water",
						"itemConsumed": true,
						"damage": 20
					}
				},
				{ "direction": "west", "to": "The Kitchen Garden" },
				{ "direction": "east", "to": "The Kitchen Cupboard" },
			]
		},
		{
			"title": "The Old Library",
			"description": "You are in a library. Dusty books line the walls.",
			"items": [ {"item": "a rusty key"} ],
			"exits": [
				{ "direction": "north", "to": "The Kitchen"}
			]
		},
		{
			"title": "The Kitchen Garden",
			"description": "A large garden with dead trees and strange looking statues everywhere.",
			"items": [ {"item": "a golden ring"}, {"item": "a clip of bullets"}],
			"exits": [
				{ "direction": "east", "to": "The Kitchen"}
			]
		},
		{
			"title": "The Kitchen Cupboard",
			"description": "It's the cupboard. There are jars with nasty looking contents in the shelves",
			"items": [ {"item": "a bottle of crystal liquid"}, {"item": "holy water"} ],
			"exits": [
				{ "direction": "west", "to": "The Kitchen"}
			]
		},
	]
}; //End of the map definition

var getPlace = () => {
    return new Promise((resolve, reject) => {
        resolve(mapData.places[0]);
    });
};

module.exports.getPlace = getPlace;