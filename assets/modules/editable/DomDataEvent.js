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

			record = Dom.composedPath(field).find(this.rootSelector)[0];
			console.log(Dom.composedPath(field));



			if(e.type == "keyup" &&  ["Enter"].includes(e.key)) {
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
			
		}
	};
		
	function DomDataEvent(init){
		init = init || {};
		this.rootSelector = init || document;
	}
	
	DomDataEvent.prototype = data;

	return DomDataEvent;

})();