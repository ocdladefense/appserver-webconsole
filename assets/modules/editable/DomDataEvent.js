const DomDataEvent = (function() {

function isEditable(elem){
		return Dom.getClass(elem).indexOf("editable") != -1;
		// return (op1 ? 1 : 0) ^ (op2 ? 1 : 0);
		// return (!op1 && op2);
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

	var data = {

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
		
			// if(e.type == "click" && !isEditing(field)){
			// 	if(this.editingElement != null && this.editingElement != field){
			// 		this.save(previousField,previousNodeName);
			// 	}
			// 	this.editingElement = this.edit(field,record,this.editingElement);
			// 	this.editingElement.focus();
			// }

			if(e.type == "keyup" && ["Enter"].includes(e.key)) {
				console.log(field.nodeName,"saved.");
				if("TEXTAREA" == nodeName && !e.shiftKey) return false;
				var db = app.getDatabase("mydb");
				var table = db.getTable("notes");
				var note = {
					id:null,
					title: "",
					body: "",
					created: "",
					position:{},
					color: ""
				};
				var savedRecord = db.addRecord({title:field.value, id:record.dataset.recordId},"notes");
				console.log(record);
				record.setAttribute("data-record-id", savedRecord.id);
				
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
		
	function DomDataEvent(init){
		init = init || {};
		this.rootSelector = init || document;
	}
	
	DomDataEvent.prototype = data;

	return DomDataEvent;

})();