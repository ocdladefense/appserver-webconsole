const DomMobileContextMenuEvent = (function() {

	var ltap;
	const DOUBLE_TAP_INTENT_THRESHOLD = 600;

	var proto = {
		handleEvent: function(e) {
			console.log(e); // TouchEvent; see also Touch and TouchList objects.
			 var now, timesince, touchmenu;
	 
			 touchmenu = document.getElementById("touchmenu");

	 
			 now = new Date().getTime();
	 
			 if(null == ltap) {
				 ltap = 0;
			 }
	 
			 timesince = now - ltap;
	 
			 if(timesince < DOUBLE_TAP_INTENT_THRESHOLD && timesince > 0){
				touchmenu.setAttribute("style","position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:blue;z-index:200;");
		
				alert("Double-tap");
				// double tap
				ltap = null;
				return false;
			 } else {
				touchmenu.setAttribute("style","display:none;position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:blue;");
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