const Note = (function(){
	

	var proto = {
	
		
		save: function(){
		
			var db = app.getDefaultDatabase();
			var request = db.save("note",this); // *Might be able to use this?
			request.then( (result) => {
				// do something with the IndexedDb id
				this.id = result.id;
			});
		},
	
		load: function(){
	
			//document.addNoteAt(note,0);

		}
	};
	
	function Note(obj) {
		this.docId = null;
		
		this.nodeId = null;
		
		this.title = null;
		
		this.body = null;
	}
	
	Note.prototype = proto;
	
	return Note;

	// var note = new Note({title:"foobar",body:"baz"})
	// note.setDocument(1);
	// note.setAttachedNode(node#)
	// note.show();
})();

