const docRoute = (function(){
	

	return {
		name: "load-document",
	
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
			var title = (params && params.title) || "Title";
			var body = (params && params.body) || "Enter your note here...";
			return {time:2000, title:title, body:body};
		},
	
	
		// Gets passed the body of the Response.
		render:  function(doc) {	
			return vNode("div",{},DocComponent.one(doc));
		}


		/*
		form: function() {
			return vNode("div",{"id":"modalContainer", "style":"top: 50%;"},
				[
					vNode("input",{name:"title",id:"noteTitle"}, []),
					vNode("input",{name:"body",id:"noteBody",},[])
				]
			);
		},



		formCallback:function(){
			var title = document.getElementById("noteTitle").value;
			var body = document.getElementById("noteBody").value;
			
			return JSON.stringify({title:title,body:body});
		}
		*/
		
		
	};
	

})();

