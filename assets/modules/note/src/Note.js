const Note = (function(){
	

	var proto = {
	
		id: null,
		
		save: function(){
			var db = app.getDefaultDatabase();
			var request = db.save("note",this); // *Might be able to use this?
			return request.then( (result) => {
				// do something with the IndexedDb id
				this.id = result[0];
				return this.id;
			});
			
		},
	
		load: function(){
	
			//document.addNoteAt(note,0);

		},

		setDocument: function(docId) {
			this.docId = docId;
		},

		setAttachedNode: function(nodeId) {
			this.nodeId = nodeId;
		},
		
		vnode: function() {
			return NoteComponent.one(this);
		}
		
	};
	
	function Note(obj) {
		this.docId = obj.docId ? obj.docId : null;
		
		this.nodeId = obj.nodeId ? obj.nodeId : null;
		
		this.title = obj.title;
		
		this.body = obj.body;

		this.location = obj.location;

		this.id = obj.id;
	}
	
	Note.prototype = proto;
	
	return Note;

	// var note = new Note({title:"foobar",body:"baz"})
	// note.setDocument(1);
	// note.setAttachedNode(node#)
	// note.show();
})();

