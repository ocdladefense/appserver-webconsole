const Doc = (function(){
	

	var proto = {

        id: null,
	
        load: function() {

        },

        showNotes: function() {
			var db = app.getDefaultDatabase();
            var request = db.query({ index: "docId", value: this.id, store: "note" });
            request.then( (objs) => {
                // var objs = [{id: 1, title:"First Note", body:"First Note Body"}, {id: 2, title:"Second Note", body:"Second Note Body"}];
                console.log("All Objects:", objs);
                objs.forEach( (obj) => {
                    console.log("Single Object:", obj);
                    var note = new Note(obj);
                    var vn = NoteComponent.one(note, (note.location && note.location.top) || 300);
                    document.getElementById("stage").appendChild(createElement(vn));
                });
           });
        },

        render: function(route, obj){
            var renderMode = route.renderMode || "append";
            var targetElement = route.elementLocation || "stage";
            var stage = document.getElementById("stage");
            var oldNode = stage.firstElementChild;
            var stageContent = oldNode.cloneNode(false);

            if(route.headers.contentType == "text/html") {
                document.getElementById("stage-content").innerHTML = obj;
                return;
            } else if(renderMode == "append") {
                document.getElementById(targetElement).appendChild(createElement(obj));
            } else {
                stageContent.appendChild(createElement(obj));
                document.getElementById(targetElement).replaceChild(stageContent, oldNode);
            }
        },

    
	};
	
	function Doc(obj) {

        if(typeof obj === "number") {
            this.id = obj;
        } else if(typeof obj === "obj") {
            this.id = obj.id;
        }
	}
	
	Doc.prototype = proto;
	
	return Doc;

})();

