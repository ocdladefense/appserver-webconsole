const OrsHandler = (function(){

    var ors = {
        getExternalContentUrl:function(){
            return "../external/";
        },

        getHandleUrls:function(){
            return ["oregonlaws.org/ors"];
        },

        handleUrl:function(url){
            try{
                var statute = url.getLastPathPart();
                var result = fetch(this.getExternalContentUrl() + statute).then( (response) => {
                    return response.text();
                }).then( (content) => {
                    var modal = new PositionedModal(content);
                    
                });
            }
            catch(e){
                
            }
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
