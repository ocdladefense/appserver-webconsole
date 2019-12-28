const TableOfContents = (function(){

	var tocComponent = function(items) {
		return tree(
			div("className=menu"),
				nodeList("li",items, (item) => {
					return ["className=toc-entry","data-section-id="+item.getAttribute("id")];
				})
		);
	};

	
	function toc(){
		var elems = document.querySelectorAll(".mw-headline");
		var menu = document.getElementById("menu-left");
		var contain = document.getElementById("container-left");
		contain.addEventListener("click",function(e){
			var target = e.target;
			var sectionId = target.dataset && target.dataset.sectionId;
			gotoSection(sectionId);
		});

		var component = tocComponent(elems);
		console.log(component);
		menu.appendChild(createElement(component));
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