const docRoute = (function(){
	

	return {
		name: "load-doc",
	
		hasParams: false,
	
		headers: {
			accept: "text/html",
			contentType: "application/json"
		},
		
		targetNodeName:null,
		
		targetClassName:null,
		
		dataStore: "document",

		elementLocation: "stage-content",

		handler: null,

		// Let's not have to call out to external server, will be nice for tesitng, too.
		url: function(params) {
			console.log(params);
			var doc = new Doc(params.docId);
			
			var loading = doc.load();
			
			return loading.then( (html) => {
				var nav = document.getElementById("doc-nav").setAttribute("class","");
				var stageContent = document.getElementById("stage-content");
				stageContent.innerHTML = html;
			})
			.then( () => {
				doc.showNotes();
			})
			.then( () => {
				new TableOfContents();
			})
			.then( () => {
				TableOfContents.top();
			});

		},
	
		// Gets passed the body of the Response.
		render:  function(doc) {	
			// return vNode("div",{},DocComponent.one(doc));
		}
		
	};
	

})();

