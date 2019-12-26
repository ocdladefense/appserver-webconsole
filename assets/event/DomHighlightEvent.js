const DomHighlightEvent = (function() {


	function DomHighlightEvent(init){
		this.rootSelector = typeof init == "string" ? init : init.rootSelector;
		this.rootElem = typeof init == "string" ? document : (init.rootSelector || document);
		this.respondTo("mousedown","anchor");
		this.respondTo("mouseup","highlight"); /* .when(function(e){
			if(!this.previousMouseXPos || Math.abs(this.previousMouseXPos-e.screenX) < 15) {
				return false;
			}
		});*/
		this.attach();
	}
	
	var highlight = {
		rootSelector: null,
		
		rootElem: document,
		
		events: {
			mousedown: [],
			mouseup: []
		},
		
		when: function(e,){
			
		},
		
		respondTo: function(evt,fn){
			if(!this.events[evt]) this.events[evt] = [];
			fn = typeof fn == "string" ? this[fn].bind(this) : fn;
			this.events[evt].push(fn);
		},
		
		attach: function() {
			for(var name in this.events){
				this.rootElem.addEventListener(name,this,true);
			}
		},
		
		remove: function(){
			for(var name in this.events){
				this.rootElem.removeEventListener(name,this,true);
			}
		},
		
		execute: function(evt,e){
			for(var i = 0; i<this.events[evt].length; i++){
				this.events[evt][i](e);
			}
		},
		
		clearSelection: function() {
		 if (window.getSelection) {window.getSelection().removeAllRanges();}
		 else if (document.selection) {document.selection.empty();}
		},
		
		highlight: function(e) {
			console.log("Highlighting...");
			var range = Dom.getRangeFromSelection();
			range.surroundContents(createElement(vNode("span",{style:"background-color:yellow;"})));
			this.clearSelection();
		},
		
		more: function(e){
			var context = document.getElementById("positioned-context-container");
			context.setAttribute("class",context.getAttribute("class")+" visible");
			context.style.top = e.pageY-85+"px";
			context.style.left = e.pageX+200+"px";
		},
		
		anchor: function(e){
			this.previousMouseXPos = e.screenX;
			return false;
		},
		
		previousMouseXPos: null,
		
		handleEvent: function(e) {
			var target = e.target;

			if(!Dom.composedPath(target).includes(this.rootSelector)) return false;
			

			
			if(e.type == "mousedown") {
				console.log("executing mouse down");
				this.execute(e.type,e);
			}

			if(e.type == "mouseup") {

				if(!this.previousMouseXPos || Math.abs(this.previousMouseXPos-e.screenX) < 15) {
					return false;
				}
				
				console.log(window.getSelection());
				console.log(Dom.composedPath(target));
			
				console.log(e);
				this.execute(e.type,e);
				this.previousMouseXPos = null;
			}
		}
	};
	
	DomHighlightEvent.prototype = highlight;

	
	
	return DomHighlightEvent;
})();