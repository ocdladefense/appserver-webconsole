define("doc", function() {
	
	return {
		routes: ["route.js"],
		files: ["src/Doc.js","src/TableOfContents.js","src/ChapterPicker.js"],
		tools: [
			{
				name: "chapterPicker",
				active: true,
				init: function(app){ return new ChapterPicker(books[0].chapters); }
			}
		],
		data: [
			"book-1.js",
			"book-2.js"
		]
	};
	
});