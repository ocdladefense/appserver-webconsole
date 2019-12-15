const TableOfContents = (function(){


	function toc(){
		var elems = document.querySelectorAll(".mw-headline");
		var menu = document.getElementById("menu-left");
		var contain = document.getElementById("container-left");
		contain.addEventListener("click",function(e){
			var target = e.target;
			var sectionId = target.dataset && target.dataset.sectionId;
			gotoSection(sectionId);
		});
		for(var i = 0; i< elems.length; i++){
			var elem = elems.item(i);
			var entry = vNode("li",{className:"toc-entry","data-section-id":elem.getAttribute("id")},elem.textContent);
			menu.appendChild(createElement(entry));
		}
	}

	function gotoSection(id) {
		var scrollIntoViewOptions = {
			behavior: "smooth",
			block: "center"
		};
		document.getElementById(id).scrollIntoView(scrollIntoViewOptions);
	}

	function TableOfContents(){
		toc();
	}


	TableOfContents.FromDomElements = function(nodeList){
	
	};


	return TableOfContents;
})();