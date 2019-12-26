const noteRoute = (function(){
	
	var Note = getModule("note");
	
	
	return {
		name: "new-note",
	
		hasParams: false,
	
		headers: {
			accept: "application/json",
			contentType: "application/json"
		},
		
		targetNodeName:null,
		
		targetClassName:null,
		
		dataStore: "notes",

		elementLocation: "stage",

		handler: new DomEditableEvent(".record-container"), // Selector to match against editable-intent events.

		// Let's not have to call out to external server, will be nice for tesitng, too.
		url: function(params) {
			var title = (params && params.title) || "Title";
			var body = (params && params.body) || "Enter your note here...";
			return {time:2000, title:title, body:body};
		},
	
	
		// Gets passed the body of the Response.
		render:  function(note) {
			document.addEventListener("click",this.handler);
			document.addEventListener("keyup",this.handler);
			
			var topPosition;
			if(!note.location) {
				topPosition = this.getNotePosition();
				topPosition += 180;
			} else {
				topPosition = note.location.top;
			}

			var node = vNode("div",{},NoteComponent.one(note,topPosition));
			
			console.log("Note is: ",node);
			
			return node;
		},

		getNotePosition: function(){
			var noteContainers = document.getElementsByClassName("note-container");
			if(noteContainers.length == 0){
				return -90;
			}
			var noteContainer = noteContainers[noteContainers.length -1];

			var topPosition = noteContainer.offsetTop;
			var leftPosition = noteContainer.offsetLeft;

			return topPosition;
		},



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
	};
	

})();

