const DomMobileContextMenuEvent = (function() {

	var ltap;
	const DOUBLE_TAP_INTENT_THRESHOLD = 600;

	var proto = {
		handleEvent: function(e) {
			var now, timesince, touchmenu, elementId;
	 
			elementId = event.target.id;

			if(elementId === "mobile-icon") {
				let menus = document.getElementsByClassName("main-menu");
				let mainMenu = menus[0];
				mainMenu.classList.toggle("mobile-menu");

				mainMenu.childNodes.forEach((child) => {
					child.classList.toggle("mobile-menu-element");
				});

				return false;
			}

			touchmenu = document.getElementById("touchmenu");

	
			now = new Date().getTime();
	
			if(null == ltap) {
				ltap = 0;
			}
	
			timesince = now - ltap;
	
			if(timesince < DOUBLE_TAP_INTENT_THRESHOLD && timesince > 0){
				//touchmenu.setAttribute("style","position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:blue;z-index:200;");
		
				alert("Double-tap");
				// double tap
				ltap = null;
				return false;
			} else {
				//touchmenu.setAttribute("style","display:none;position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:blue;");
				// too much time to be a doubletap
			}

			ltap = new Date().getTime();
			return false;
		}
	};



		
	function DomMobileContextMenuEvent(init){
		this.rootSelector = init || document;
		init = init || {};
	}
	
	DomMobileContextMenuEvent.prototype = proto;

	return DomMobileContextMenuEvent;

})();