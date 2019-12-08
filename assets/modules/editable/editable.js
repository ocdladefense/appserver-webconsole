const Editable = (function() {


	function getClass(elem) {
		return elem.getAttribute("class");
	}
	
	function getProps(elem){
		var p = {};
		var props = elem.getAttributeNames();
		for(var i = 0; i<props.length; i++){
			var prop = props[i];
			var value = elem.getAttribute(prop);
			p["class" == prop ? "className" : prop] = value;
			// console.log(props.item(i));
		}
		
		return p;
	}
	
	function isEditable(elem){
		return getClass(elem).indexOf("editable") != -1;
		// return (op1 ? 1 : 0) ^ (op2 ? 1 : 0);
		// return (!op1 && op2);
	}
	
	function isEditing(elem) {
		return ["INPUT","TEXTAREA"].includes(elem.nodeName);
	}
	
	function replace(newElem, oldElem){
		oldElem.parentNode.replaceChild(newElem,oldElem);
	}



	function getEditNode(elem){
		var type,text,value,props;


		value = elem.firstChild.nodeValue;
		props = getProps(elem);

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
		props = getProps(inputOrTextArea);
		nodeName = nodeName || props["data-node-name"];
		
		delete props["data-node-name"];
		delete props["value"];

		return vNode(nodeName,props,text);
	}
	
	

	var editable = {

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

		

	
	function Editable(init){
		init = init || {};
		this.root = init.root || document;
	}
	
	Editable.prototype = editable;

	return Editable;
})();