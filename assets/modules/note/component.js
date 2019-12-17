define("note",function(){

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
		
		
		var note = {
			constructor: Note,
			
			toVnode: function(){
				console.log("foobar");
			}
		};

		function one(note,topPosition) {

			var container = vNode("div",{className:"record-container note-container", style:("top:" + topPosition + "px")},[]);
			container.children.push(formItem("created","div",getTimestamp(),false));
			container.children.push(formItem("title","h3",note.title,"title",true));
			container.children.push(formItem("body","div",note.body,"body",true));

			return container;
		}
		
		function many(notes,num){
			return (new Array(num)).map(one);
		}
		
		function Note(init){
			this.title = init.title;
			this.body = init.body;
		}
		
		Note.prototype = note;
		
		Note.one = one;
		Note.many = many;
		
		return Note;
});