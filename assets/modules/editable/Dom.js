const Dom = (function() {

	function getSelection() {
		return window.getSelection();
	}
	
	function getRangeFromSelection(){
		return getSelection().getRangeAt(0);
	}
	
	function getClass(elem) {
		return elem.getAttribute("class");
	}
	
	function hasClass(elem,className){
		var className = getClass(elem);
		return null == className ? false : getClass(elem).indexOf(className) != -1;
	}
	
	function getProps(elem){
		var p = {};
		var props = elem.getAttributeNames();
		for(var i = 0; i<props.length; i++){
			var prop = props[i];
			var value = elem.getAttribute(prop);
			p["class" == prop ? "className" : prop] = value;
			// console.log(props.item(i));
		}
		
		return p;
	}

	
	function replace(newElem, oldElem){
		oldElem.parentNode.replaceChild(newElem,oldElem);
	}



	
	function composedPath(el,path) {

			path = path || [];


			
			if(null == el || el.nodeName === "HTML") return new DomList(path);
			path.push(el);			
			return composedPath(el.parentNode,path);
	}

	function DomList(init){
		this.elements = init;
	}
	DomList.prototype = {
		// If at least one match then return true.
		includes: function(sel){
			sel = sel.split(".")[1];
			return this.find(sel).length > 0;
		},
		
		find: function(sel){
			return this.elements.filter((item) => { return hasClass(item,sel); });
		}
	};
	function Dom(init){
		init = init || {};
		this.root = init.root || document;
	}
	
	var dom = {};
	
	Dom.prototype = dom;

	Dom.getClass = getClass;
	Dom.getProps = getProps;
	Dom.replace = replace;
	Dom.composedPath = composedPath;
	Dom.getSelection = getSelection;
	Dom.getRangeFromSelection = getRangeFromSelection;
	
	return Dom;
})();