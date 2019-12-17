const DomContextMenuEvent = (function() {


	var contextMenu = {
		
		events: {},
		
		handleEvent: function(e){
			var elem = e.target;
			var x = e.clientX;
			var y = e.clientY;

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