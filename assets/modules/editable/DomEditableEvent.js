const DomEditableEvent = (function() {


	
	function isEditable(elem){
		return Dom.getClass(elem).indexOf("editable") != -1;
		// return (op1 ? 1 : 0) ^ (op2 ? 1 : 0);
		// return (!op1 && op2);
	}
	
	function isEditing(elem) {
		return ["INPUT","TEXTAREA"].includes(elem.nodeName);
	}
	



	function getEditNode(elem){
		var type,text,value,props;


		value = elem.firstChild.nodeValue;
		props = Dom.getProps(elem);

		props["data-node-name"] = elem.nodeName;
		
		type = ["DIV"].includes(elem.nodeName) ? "textarea" : "input";
		if("textarea" == type) {
			text = elem.firstChild.nodeValue;
			props["cols"] = 16;
			props["rows"] = 5;
		} else {
			props.value = elem.firstChild.nodeValue;
		}
		
		var vnode = vNode(type,props,text);
		console.log(vnode);
		return vnode;
	}



	function getElementNode(inputOrTextArea,nodeName){
		var text,props;

		text = inputOrTextArea.value;//["TEXTAREA"].includes(inputOrTextArea.nodeName) ? inputOrTextArea.firstChild.nodeValue : inputOrTextArea.value;
		props = Dom.getProps(inputOrTextArea);
		nodeName = nodeName || props["data-node-name"];
		
		delete props["data-node-name"];
		delete props["value"];

		return vNode(nodeName,props,text);
	}
	
	

	var editable = {
		rootSelector: null,
		
		targetNodeName: null,
		
		targetClassName: null,

		editingElement: null,
		
		events: {},
		
		editing: function(elem){
			return 
		},
		
		handleEvent: function(e){
			var field = e.target;
			var record;
			var nodeName = field.nodeName;
			var previousField;
			var input;

			if(!Dom.composedPath(field).includes(this.rootSelector)) return false;
			
			// Container corresponding to this field; think of it as the record for it.
			record = Dom.composedPath(field).find(this.rootSelector)[0];

			if(!isEditable(field)) return false;

			// this.targetNodeName = field.nodeName;
			// this.targetClassName = Dom.getClass(field);
		
			if(e.type == "click" && !isEditing(field)){
				if(this.editingElement != null && this.editingElement != field){
					this.done(this.editingElement);//,previousNodeName);
				}
				this.editingElement = this.edit(field,record,this.editingElement);
				this.editingElement.focus();
			}

			if(e.type == "keyup" && isEditing(field) && ["Enter","Tab"].includes(e.key)) {
				console.log(field.nodeName,"saved.");
				if("TEXTAREA" == nodeName && !e.shiftKey) return false;
				this.done(field,record,this.editingElement);
			}
			
				
		},

		
		edit: function(field, record, previousField) {
			//the editing element should always refer to an input or text area
			var vnode, node;
			
			vnode = getEditNode(field);
			node = createElement(vnode);
			Dom.replace(node,field);

			return node;
		},
		
		done: function(field, record, previousField) {
			var value, replacement, saveToNodeName;

			replacement = createElement(getElementNode(field));
			Dom.replace(replacement,field);
			this.editingElement = null;
		}
	};

		

	
	function DomEditableEvent(init){
		init = init || {};
		this.rootSelector = init || document;
	}
	
	DomEditableEvent.prototype = editable;

	return DomEditableEvent;
})();