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
		url: "document/some-id",
	
		// Gets passed the body of the Response.
		render:  function(doc) {	
			return vNode("div",{},DocComponent.one(doc));
		}
		
	};
	

})();

