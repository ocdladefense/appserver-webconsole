var NoteComponent = (function(){

		const DEFAULT_NOTE_TITLE = "Note Title";
		
		const DEFAULT_NOTE_BODY = "Note Body";
		
		
		function formItem(label, nodeName, value, datafield, editable) {
			var c = vNode("div",{className:"form-item form-item-"+label});
			var labelc = "note-"+label;
			var fieldc = editable ? ["editable","note-"+label].join(" ") : "note-"+label;
			var children = [
				vNode("label",{className:labelc},label),
				vNode(nodeName,{className:fieldc, "data-field":datafield, placeholder:"Enter note "+label+"..."},value)
			];
			
			c.children = children;
			return c;
		}
		
		
		var proto = {
			constructor: NoteComponent
		};

		function one(note,topPosition) {
			var id = note.id || "";
			var container = vNode("div",{className:"record-container note-container", style:("top:" + topPosition + "px"),"data-record-type":"note","data-record-id": id},[]);
			container.children.push(formItem("created","div",getTimestamp(),false));
			container.children.push(formItem("title","h3",note.title || DEFAULT_NOTE_TITLE,"title",true));
			container.children.push(formItem("body","div",note.body || DEFAULT_NOTE_BODY,"body",true));

			return container;
		}
		
		function many(notes,num){
			return (new Array(num)).map(one);
		}
		
		function NoteComponent(init){
			this.title = init.title;
			this.body = init.body;
		}
		
		NoteComponent.prototype = proto;
		
		NoteComponent.one = one;
		NoteComponent.many = many;
		
		return NoteComponent;
})();