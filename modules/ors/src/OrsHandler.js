const OrsHandler = (function(){

		const CONTENT_URL = "/external";
		
		const DOM_RENDER = false;
		
		const REACT_RENDER = true;
		
		
		
    function getHandleUrls(){
			return ["oregonlaws.org/ors"];
		}
		
		
		
    var ors = {
    
			handleUrl:function(url,point){
				var statute, modal, fetchPromise;
				
				statute = url.getLastPathPart();
				
				fetchPromise = fetch(CONTENT_URL + "/"+statute)
				.then( (response) => {
						return response.text();
				})
				.then( (content) => {
						modal = new PositionedModal(content,point,REACT_RENDER); // or REACT_RENDER
						modal.render();
				});

			},

			shouldIHandle:function(url){
					return true;
			}
        
    };

    function OrsHandler(app){
        app.linkManager.registerHandler("ors",this);
    }

    OrsHandler.prototype = ors;
    return OrsHandler;

})();
