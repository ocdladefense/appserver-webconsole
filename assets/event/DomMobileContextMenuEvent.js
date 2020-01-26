const DomMobileContextMenuEvent = (function() {

	var ltap;
	const DOUBLE_TAP_INTENT_THRESHOLD = 600;

	var proto = {
		handleEvent: function(e) {
			var now, timesince, touchmenu, elementId;
	 
			element = e.target;

			// if the element clicked is the mobile icon, and the mobile menu is not already active, open the mobile menu
			if(element.id === "mobile-icon" && !element.classList.contains("mobile-menu-active")) { 
				let menus = document.getElementsByClassName("main-menu");
				let mainMenu = menus[0];

				element.classList.add("mobile-menu-active");

				mainMenu.classList.add("mobile-menu");

				let slideTime = 0;

				window.setTimeout(() => { mainMenu.classList.add("mobile-menu-slide-in")}, 20);

				mainMenu.childNodes.forEach((menuItem) => { // add necessary classes of child elements
					menuItem.classList.add("mobile-menu-element");

					window.setTimeout(() => { menuItem.classList.add("mobile-menu-item-slide-in") }, slideTime);
					menuItem.childNodes.forEach((menuElement) => {
						if(!menuElement.classList.contains("sub-menu")) {
							return;
						}
						menuElement.childNodes.forEach((subMenuElement) => {
							subMenuElement.classList.add("sub-menu-element");
						});
					});
					slideTime += 100;
				});

				return false;
			}
			else if(element.nodeName !== "A") { // if the element clicked is not an A tag, close the dropdown menu
				let menus = document.getElementsByClassName("main-menu");
				let mainMenu = menus[0];

				let slideTime = 20;
				let timeOutTime = 200;

				if(mainMenu.classList.contains("mobile-menu-slide-in")) {
					window.setTimeout(() => { mainMenu.classList.add("mobile-menu-slide-out")}, slideTime);
				}

				window.setTimeout(() => { mainMenu.classList.remove("mobile-menu-slide-in")}, timeOutTime);
				window.setTimeout(() => { mainMenu.classList.remove("mobile-menu-slide-out")}, timeOutTime);

				mainMenu.childNodes.forEach((menuItem) => {
					window.setTimeout(() => { menuItem.classList.remove("mobile-menu-item-slide-in") }, slideTime);
				})

				// Remove the mobile-menu-active class from mobile-icon
				let menuIcon = document.getElementById("mobile-icon");
				menuIcon.classList.remove("mobile-menu-active");
				
				window.setTimeout(() => {
					mainMenu.classList.remove("mobile-menu");

					mainMenu.childNodes.forEach((menuItem) => {
						menuItem.classList.remove("mobile-menu-element");
						menuItem.childNodes.forEach((menuElement) => {
							if(!menuElement.classList.contains("sub-menu")) {
								return;
							}
							menuElement.childNodes.forEach((subMenuElement) => {
								subMenuElement.classList.remove("sub-menu-element");
							});
						});
					});

				}, timeOutTime);

			}


			/*
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
			*/
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