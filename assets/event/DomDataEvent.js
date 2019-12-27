const DomDataEvent = (function() {

	function isEditable(elem){
		return Dom.getClass(elem).indexOf("editable") != -1;
		// return (op1 ? 1 : 0) ^ (op2 ? 1 : 0);
		// return (!op1 && op2);
	}

	/*
	function getElementNode(inputOrTextArea,nodeName){
		var text,props;

		text = inputOrTextArea.value;//["TEXTAREA"].includes(inputOrTextArea.nodeName) ? inputOrTextArea.firstChild.nodeValue : inputOrTextArea.value;
		props = Dom.getProps(inputOrTextArea);
		nodeName = nodeName || props["data-node-name"];
		
		delete props["data-node-name"];
		delete props["value"];

		return vNode(nodeName,props,text);
	}
	*/

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
			var store;
			var record, domRecord;
			var previousField;
			var input;
			var id;
			var fieldName;


			if(e.type == "keyup" &&  ["Enter"].includes(e.key)) {
				domRecord = Dom.composedPath(field).find(this.rootSelector)[0];
				console.log(domRecord);
				console.log(field.nodeName,"saved.");
				
				if("TEXTAREA" == nodeName && !e.shiftKey) return false;
				
				
				id = (domRecord.dataset && domRecord.dataset.recordId) || null;
				store = (domRecord.dataset && domRecord.dataset.recordType) || null;
				
				fieldName = (field.dataset && field.dataset.field) || null;

				
				if(fieldName == null){
					throw new Error("field name is null");
				}

				var record = {id:id};
				record[fieldName] = field.value; 

				app.save(store,record).then(function(result){
					console.log("Record is: ",record);
					console.log("IndexedDb Result is: ",result);
					domRecord.setAttribute("data-record-id", result[0]);
				});
					
			}
			
			return false;
		}
	};
		
	function DomDataEvent(init){
		this.rootSelector = init || document;
		init = init || {};
	}
	
	DomDataEvent.prototype = data;

	return DomDataEvent;

})();