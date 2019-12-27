const DomContextMenuEvent = (function() {


	var contextMenu = {
		
		events: {},
		
		handleEvent: function(e){
			e.preventDefault();
			var elem = e.target;
			var x = e.pageX;
			var y = e.clientY+window.pageYOffset;

			var nodeId = this.getNodeId(y);

			var note = new Note({title:"noteT",body:"noteB",docId:1,nodeId:nodeId});
			var request = note.save();
			request.then (id => {
				note.show();
			})

			
			console.log("x = "+x+" y = "+y);
			

			if(elem.classList.contains("has-context")){
				e.preventDefault();
				var containerElement = this.render();
				elem.parentElement.appendChild(createElement(containerElement));
				var menuContainer = document.getElementById("context-menu-container");
				
				menuContainer.style.position = "absolute";
				menuContainer.style.top = y+'px';
				menuContainer.style.left = x+'px';
				this.events[e] = e.type;
			}
			else{
				return false;
			}
		},

		getNodeId:function(y){
			var stageContent = document.getElementById("stage-content");
			var elements = stageContent.querySelectorAll('p,blockquote');

			for(var i = 0; i < elements.length; i++){
				var element = elements[i];
				var rect = element.getBoundingClientRect();
				var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				var location =  { top: rect.top + scrollTop, left: rect.left + scrollLeft };
				//console.log(location.top, y);

				if(y < location.top){
					console.log(i-1);
					console.log(location.top, y);
					return i-1;
				}

			};


		},

		render: function(){
			console.log("RENDER");
			var container = vNode("div",{id:"context-menu-container"},[]);
			//var contextMenu = vNode("div",{id:"context-menu"},[]);
			//container.children.push(contextMenu);
			return container;
		}
	};
		
	function DomContextMenuEvent(){
	
	}
	
	DomContextMenuEvent.prototype = contextMenu;

	return DomContextMenuEvent;

})();