const DomContextMenuEvent = (function() {


	var contextMenu = {

		targetNodeName: null,
		
		targetClassName: null,

		editingElement: null,
		
		events: {},
		
		editing: function(elem){
			return 
		},
		
		handleEvent: function(e){
            console.log("CONTEXT HANDLE EVENT");
			var field = e.target;
			var nodeName = field.nodeName;
			var record;
			var previousField;
			var input;

			this.targetNodeName = field.nodeName;
			this.targetClassName = getClass(field);
			if(e.type == "keyup" && ["Enter"].includes(e.key)) {
				console.log(field.nodeName,"saved.");
				if("TEXTAREA" == nodeName && !e.shiftKey) return false;
				this.save(field,record,this.editingElement);
			}
			
				
		},

		
		edit: function(field, record, previousField) {
			//the editing element should always refer to an input or text area
			var vnode, node;
			
			vnode = getEditNode(field);
			node = createElement(vnode);
			replace(node,field);

			return node;
		},
		
		save: function(field, record, previousField) {
			var value, replacement, saveToNodeName;

			replacement = createElement(getElementNode(field));
			replace(replacement,field);
			this.editingElement = null;
		}
	};
		
	function DomContextMenuEvent(){
	
	}
	
	DomContextMenuEvent.prototype = contextMenu;

	return DomContextMenuEvent;

})();