const DomHighlightEvent = (function() {


	/*
	function DomList(init){
		this.elements = init;
	}
	DomList.prototype = {
		// If at least one match then return true.
		includes: function(sel){
			sel = sel.split(".")[1];
			return this.find(sel).length > 0;
		},
		
		find: function(sel){
			return this.elements.filter((item) => { return hasClass(item,sel); });
		}
	};
	*/
	function DomHighlightEvent(init){
		this.rootSelector = init || document;
		this.respondTo("mouseup","highlight");
	}
	
	var highlight = {
		mouseup: [],
		
		respondTo: function(evt,fn){
			if(!this[evt]) this[evt] = [];
			fn = typeof fn == "string" ? this[fn] : fn;
			this[evt].push(fn);
		},
		
		execute: function(evt,e){
			for(var i = 0; i<this[evt].length; i++){
				this[evt][i](e);
			}
		},
		
		highlight: function() {
			console.log("Highlighting...");
			var range = Dom.getRangeFromSelection();
			range.surroundContents(createElement(vNode("span",{style:"background-color:yellow;"})));
		},
		
		handleEvent: function(e) {
			var target = e.target;
			console.log(e);
			if(e.type == "mouseup") {
				this.execute(e.type,e);
			}
		}
	};
	
	DomHighlightEvent.prototype = highlight;

	
	
	return DomHighlightEvent;
})();