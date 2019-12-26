const DomLayoutEvent = (function() {



	var layout = {

		targetNodeName: null,
		
		targetClassName: null,

		editingElement: null,
		
		events: {},
		
		editing: function(elem){
			return 
		},
		
		handleEvent: function(e){
			var field = e.target;
			var nodeName = field.nodeName;
			var record;
			var previousField;
			var input;


			if(!isEditable(field)) return false;

			this.targetNodeName = field.nodeName;
			this.targetClassName = getClass(field);
		
			if(e.type == "click" && !isEditing(field)){
				if(this.editingElement != null && this.editingElement != field){
					this.save(previousField,previousNodeName);
				}
				this.editingElement = this.edit(field,record,this.editingElement);
				this.editingElement.focus();
			}

			if(e.type == "keyup" && isEditing(field) && ["Enter","Tab"].includes(e.key)) {
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

			/*
			var theVNode = this.done(this.editingElement, this.targetNodeName);
			console.log("The editing element:" + this.editingElement);
			console.log("the target:" + target);
			this.replace(createElement(theVNode),this.editingElement);
			*/
		}
	};
		
		function DomLayoutEvent(){
		
		}
		
		DomLayoutEvent.prototype = layout;

		return DomLayoutEvent;

})();