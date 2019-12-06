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

			editingElement: null,
			
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

			done: function(inputOrTextArea,nodeName){
				var text,props;
				
				//this.targetClassName = getClass(inputOrTextArea);
		
				text = inputOrTextArea.value;
				props = getProps(inputOrTextArea);

				return vNode(nodeName,props,text);
			},

			replace: function(newElem, oldElem){
				oldElem.parentNode.replaceChild(newElem,oldElem);

			},
			
			handleEvent: function(e){
					var target = e.target;
					var value;
					var replace;

					if(getClass(target) == null)
							return false;

					if(e.type == "click" && getClass(target).indexOf("editable") != -1){
						if(target.nodeName == "INPUT" || target.nodeName == "TEXTAREA"){
							return false;
						}
						if(this.editingElement != null && this.editingElement != target){
							var theVNode = this.done(this.editingElement, this.targetNodeName);
							console.log("The editing element:" + this.editingElement);
							console.log("the target:" + target);
							this.replace(createElement(theVNode),this.editingElement);
						

						}
						//the editing element should always refer to an input or text area
						replace = this.edit(target);
						this.editingElement = createElement(replace);
						this.replace(this.editingElement,target);
						this.editingElement.focus();
						this.editingElement.setSelectionRange(this.editingElement.value.length,this.editingElement.value.length);
						return false;
					}

					if(e.type == "keyup" && e.key == "Enter" && e.target.nodeName == "INPUT"){

							replace = this.done(target,this.targetNodeName);

							var replacement = createElement(replace);
							this.replace(replacement,target);
							this.editingElement = null;
					}
			},
		};
		
		function Editable(){
		
		}
		
		Editable.prototype = editable;

		return Editable;

})();