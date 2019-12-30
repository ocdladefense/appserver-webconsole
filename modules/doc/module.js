define("doc", function() {
	
	return {
		routes: ["route.js"],
		files: ["src/Doc.js","src/TableOfContents.js"],
		tools: [
			{
				name: "toc",
				active: false,
				init: function(app){ return new TableOfContents(); }
			}
		],
		data: [
			"book-1.js",
			"book-2.js"
		]
	};
	
});