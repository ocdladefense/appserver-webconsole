const notes = (function(){
	
	noteMod = getModule("note");
	
	
	return {
		name: "new-note",
	
		hasParams: true,
	
		headers: {
			accept: "application/json",
			contentType: "application/json"
		},
		
		targetNodeName:null,
		
		targetClassName:null,
		
		dataStore: "notes",

		handler: new Editable(),

		// Let's not have to call out to external server, will be nice for tesitng, too.
		url: function(params) {
			return {id:"foobar",time:2000, title:params.noteTitle, body:params.noteBody};
		},
	
		// Gets passed the body of the Response.
		render:  function(note) {
			document.addEventListener("click",this.handler);
			document.addEventListener("keyup",this.handler);
			return noteMod.many(note,15);
		},



		form: function() {
			return vNode("div",{"id":"modalContainer"},
				[
						vNode("input",{name:"noteTitle",id:"noteTitle"}, []),
						vNode("input",{name:"noteBody",id:"noteBody"},[])
				]
			);
		},



		formCallback:function(){
			var title = document.getElementById("noteTitle").value;
			var body = document.getElementById("noteBody").value;
			
			return JSON.stringify({"noteTitle":title,"noteBody":body});
		}
	};
	

})();

