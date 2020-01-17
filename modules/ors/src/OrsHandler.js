const OrsHandler = (function(){

		const HTML_CONTENT = "/ors-html";

		const TEXT_CONTENT = "/ors-text";
		
		const DOM_RENDER = false;
		
		const REACT_RENDER = true;
			
		
    var ors = {
    
			handleUrl:function(url,point,e){
				var statute, chapter, section;
				var modal, fetchPromise;
				
				statute = url.getLastPathPart();
				chapter = statute.split(".")[0];
				section = statute.split(".")[1];
				
				if(e.type == "click"){
					this.renderPositionedModal(point,chapter,section);
					//this.renderObrusiveModal(point,e,statute);
				}
				// else if(e.type == "mouseover"){
				// 	setTimeout(this.renderInlineModal(point,e,statute), 1500);
				// }
			},



			renderPositionedModal:function(point,chapter,section){
				fetchPromise = fetch(TEXT_CONTENT + "/"+chapter+"/"+section)
				.then( (resp) => {
						return resp.text();
				})
				.then( (text) => {
						var content;
						// content += "2017 ORS / Vol. 4 / Chapter 137 / Section 137.700";
						content = "<div class='inline-fade'>&nbsp;</div><div class='focus-text'>"+"ORS "+[chapter,section].join(".")+"</div>" + text;
						modal = new PositionedModal(content,point,REACT_RENDER,"inline"); // or REACT_RENDER
						modal.render();
				});
			},
			
			
			renderObrusiveModal:function(point,chapter,section){
				fetchPromise = fetch(HTML_CONTENT + "/"+chapter+"/"+section)
				.then( (resp) => {
						return resp.text();
				})
				.then( (markup) => {
						modal = new PositionedModal(markup,point,REACT_RENDER); // or REACT_RENDER
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
