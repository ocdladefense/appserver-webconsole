const ChapterPicker = (function(){

	var chapterComponent = function(docId,url,name) {
		var className = docId === 1 ? "doc-title active" : "doc-title";
		var link = vNode("a",{href:url,"data-doc-id":docId,"data-route":"load-doc"},name);
		return vNode("div",{className:className},link);
	};

	
	function chapters(duples){
		var chapts = [];
		var index = 0;
		for(var i = 0; i<duples.length; i++) {
			if(i % 2 === 0) index++;
			chapts.push( chapterComponent(index,duples[i],duples[++i]) );
		}

		var picker = document.getElementById("doc-nav-content");
		
		chapts.forEach(function(chapt){ 
			picker.appendChild(createElement(chapt));
		});
	}


	function ChapterPicker(chapts){
		chapters(chapts);
	}


	ChapterPicker.FromDomElements = function(nodeList){
	
	};


	return ChapterPicker;
})();