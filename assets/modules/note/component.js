const note = (function(){

		function formItem(label, nodeName, editable) {
			var c = vNode("div",{className:"form-item"},[]);
			var labelc = editable ? "editable-label" : "label";
			var labelf = editable ? ["editable","note-"+label].join(" ") : "note-"+label;
			var children = [
				vNode("label",{className:"editable-label"},label),
				vNode(nodeName,{className:labelf.join(" ")},label)
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

		function one(note) {
			var created = getTimeStamp();
			var container = vNode("div",{className:"note-container"},[]);
			container.children.push(formItem("title","h3",note.title));
			container.children.push(formItem("body","div",note.body));
			container.children.push(formItem("created","div",created));
			
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
		Note.many = many
})();