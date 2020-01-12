const OrsHandler = (function(){

		const HTML_CONTENT = "/html-content";

		const TEXT_CONTENT = "/text-content";
		
		const DOM_RENDER = false;
		
		const REACT_RENDER = true;
		
		
		
    function getHandleUrls(){
			return ["oregonlaws.org/ors"];
		}
		
		
		
    var ors = {
    
			handleUrl:function(url,point,e){
				var statute, modal, fetchPromise;
				
				statute = url.getLastPathPart();

				console.log("TYPE", e.type);
				
				if(e.type == "click"){
					this.renderPositionedModal(point,statute);
				}
				// else if(e.type == "mouseover"){
				// 	setTimeout(this.renderInlineModal(point,e,statute), 1500);
				// }
			},

			renderInlineModal:function(point,e,statute){
				console.log("MOUSEOVER");
				// fetchPromise = fetch(TEXT_CONTENT + "/"+statute)
				// .then( (response) => {
				// 		return response.text();
				// })
				// .then( (content) => {
				// 		modal = new InlineModal(content,point,REACT_RENDER); // or REACT_RENDER
				// 		modal.render();
				// });
			},




			renderPositionedModal:function(point,statute){
				console.log("CLICK");
				fetchPromise = fetch(HTML_CONTENT + "/"+statute)
				.then( (resp) => {
						return resp.text();
				})
				.then( (respBody) => {
						var content;
						// content += "2017 ORS / Vol. 4 / Chapter 137 / Section 137.700";
						content = "<div class='inline-fade'>&nbsp;</div><span class='focus-text'>ORS 137.700</span>" + respBody;
						modal = new PositionedModal(content,point,REACT_RENDER,"inline"); // or REACT_RENDER
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
