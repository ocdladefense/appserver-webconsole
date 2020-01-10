const OrsHandler = (function(){

		const CONTENT_URL = "/external";
		
    var ors = {
        getExternalContentUrl:function(){
            return "../external/";
        },

        getHandleUrls:function(){
            return ["oregonlaws.org/ors"];
        },

        handleUrl:function(url,point){
					var statute, modal, fetchPromise;
					
					statute = url.getLastPathPart();
					
					fetchPromise = fetch(CONTENT_URL + "/"+statute)
					.then( (response) => {
							return response.text();
					})
					.then( (content) => {
							modal = new PositionedModal(content,point);
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
