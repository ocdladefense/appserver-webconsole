const Doc = (function(){
	

	var proto = {

		id: null,

		load: function() {
			return fetch("/doc/"+this.id).then( (resp) => { return resp.text(); });
		},

		showNotes: function() {
			var db = app.getDefaultDatabase();
			var request = db.query({ index: "docId", value: this.id, store: "note" });
			
			request.then( (objs) => {
				var mw = document.getElementById("mw-content-text");
				var elements = mw.querySelectorAll('p,blockquote');
		
				objs.forEach( (obj) => {
					var note = new Note(obj);
					var index = note.nodeId;
					// elements[index].appendChild(createElement(NoteComponent.one(note)));
				});
		 });
		 
		}

    
	};
	
	function Doc(obj) {

        if(typeof obj === "number" || typeof obj === "string") {
            this.id = obj;
        } else if(typeof obj === "obj") {
            this.id = obj.id;
        }
	}
	
	Doc.prototype = proto;
	
	return Doc;

})();

