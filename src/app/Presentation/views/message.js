
var theCrypt;
(function(theCrypt){
	var Views;
	(function(){
        "use strict";

		var message = function(){
			return {
				render: function(message){
                    var div = document.getElementById("messages");
			        var template = document.getElementById("messageTemplate").innerHTML;

					var data = { message: message };
					div.innerHTML = Handlebars.compile(template)(data);
				},
				clear: function(){
					document.getElementById("messages").innerHTML = "";
				}
			};
		};
		
		this.message = message();
	}).apply(theCrypt.Views || (theCrypt.Views = {}));
})(theCrypt || (theCrypt = {}));

module.exports = theCrypt;