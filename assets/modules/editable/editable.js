const Editable = (function() {


	function getClass(elem) {
		return elem.getAttribute("class");
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

	var editable = {
	
			targetNodeName: null,
			
			targetClassName: null,
			
			events: {},
			
			edit: function(elem){
				var text,props;
				this.targetNodeName = elem.nodeName;
				this.targetClassName = getClass(elem);
		
				text = elem.firstChild.nodeValue;
				props = getProps(elem);
				props.value = text;
				
				return vNode("input",props,[]);
			},
			
			handleEvent: function(e){
					var target = e.target;
					var value;
					var replace;

					if(getClass(target) == null)
							return false;
					if(e.type == "click" && getClass(target).indexOf("editable") != -1){

							replace = this.edit(target);
					
					}

					if(e.type == "keyup" && e.key == "Enter"){
							replace = vNode(this.targetNodeName,{className:this.targetClassName},target.value);
						
							console.log("KEY UP EVENT");
					}
					
					target.parentNode.replaceChild(createElement(replace),target);
			},
		};
		
		function Editable(){
		
		}
		
		Editable.prototype = editable;

		return Editable;

})();