define("ors", function() {
	
	return {
		files: ["src/OrsHandler.js"],
		tools: [
			{
				name: "orsHandler",
				active: true,
				init: function(app){ return new OrsHandler(app); }
			}
		],
		data:[],
		routes:[]
	};
});