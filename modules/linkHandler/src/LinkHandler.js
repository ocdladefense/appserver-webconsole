const LinkHandler = (function() {

	function isNodeLink(e){
		return !e.target.href;
	}

	function isNodeType(node,nodeName){
		if(node == nodeName)
			return true;
		return false;
	}

	var linkHandler = {
		events: {},

		
		handleEvent: function(e) {

			var x = e.pageX;
			var y = e.clientY;
			
			if(!isNodeLink(e) && !isNodeType(e.target,"A"))
				return false;
			e.preventDefault();

			var url = new UrlParser(e.target.href);
		
			for(var name in this.handlers){
				if(this.handlers[name].shouldIHandle(url)){
					this.handlers[name].handleUrl(url);
					return false;
				}
			}
		},

		registerHandler:function(name, handler){
			//call to register the orsHandler if the link has the pattern use the registered handler
			this.handlers[name] = handler;
		},
		
		render: function(){}
	};

	function LinkHandler(){
		this.handlers = {};
	}
	
	
	LinkHandler.prototype = linkHandler;


	return LinkHandler;
})();