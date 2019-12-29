const DomContextMenuEvent = (function() {


	var contextMenu = {
		
		events: {},
		
		// Target where the context menu is currently being displayed.
		activeTargetIndex: null,
		
		handleEvent: function(e) {
		
			e.preventDefault();
			var target = e.target;
			var x = e.pageX;
			var y = e.clientY+window.pageYOffset;

			// var nodeId = this.getNode(target);
			this.getTarget(target);

			var note = new Note({docId: app.currentDocument,nodeId:this.activeTargetIndex});
			var request = note.save();
			request.then(id => {
				var elem = createElement(note.vnode());
				target.appendChild(elem);
				// note.showAt(x,y)
			});
			
		},
		
		
		
		
		getTarget: function(target) {
			
			Array.prototype.forEach.call(target.parentNode.children,
				function(elem,index,arr) {
					if(target == elem) {
						console.log(elem);
						this.activeTargetIndex = index;
					}
				},this
			);
		},


		getNotePosition: function(y){
			var stageContent = document.getElementById("stage-content");
			var elements = stageContent.querySelectorAll('p,blockquote');

			for(var i = 0; i < elements.length; i++){
				var element = elements[i];
				var rect = element.getBoundingClientRect();
				var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				var location =  { top: rect.top + scrollTop, left: rect.left + scrollLeft };

				if(y < location.top) {
					return !i ? 0 : (i-1);
				}
			}

		},


		render: function(){
			var container = vNode("div",{id:"context-menu-container"},[]);
			return container;
		}
	};
		
	function DomContextMenuEvent(){
	
	}
	
	DomContextMenuEvent.prototype = contextMenu;

	return DomContextMenuEvent;

})();