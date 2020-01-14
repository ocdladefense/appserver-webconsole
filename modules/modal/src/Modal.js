'use strict';

const Modal = (function() {

	// Keep the React name just because.
	function mount(){
    	document.body.classList.add("has-modal");	
	}
	
	
	function unMount(){
		document.body.classList.remove("has-modal");
		let root = document.querySelector("#pModalContainer");
		ReactDOM.unmountComponentAtNode(root);
	}
	


	class Modal {

		constructor(props,useReact) {
			this.props = props || {};
			this.useReact = useReact;
			let className = this.props.className ? "has-modal" : "has-modal " + this.props.className;
			document.body.classList.add("has-modal");
			document.body.classList.add("inline");
			
			this.htmlRoot = document.querySelector('body');

			//if statement here: is the modal container already in the documents
			if(document.querySelector('#pModalContainer') == null){
				this.root = createElement(vNode("div", {id:"pModalContainer"}, null));
				this.root.addEventListener("click", () => { Modal.unMount() });
				this.htmlRoot.appendChild(this.root);
			}
			else{
				this.root = document.querySelector('#pModalContainer');
			}
		}


		/**
		 * Use React or optionally use standard DOM
		 * methods to render the Modal.
		 * When using React we can reference component/ModalComponent
		 */
		render(content) {
			content = content || this.props.content;
		
			if(!this.useReact) {
				this.domRender(content);
			} else {
				this.reactRender();
			}
		}

	
		/**
		 * Option to render this PositionedModal 
		 *  using React component.
		 */
		reactRender() {
			// Invoke the ModalComponent with only content.
		
			var state = {
				content: this.props.content,
				pos: this.props.pos,
				className: this.props.className
			};
		
			var component = React.createElement(
				ModalComponent,
				state
			);
		
			ReactDOM.render(
				component,
				this.root
			);
		}
	
	
		/**
		 * Option to render this PositionedModal 
		 * using standard DOM methods.
		 *  See assets/lib/view.js
		 */
		domRender(html) {
			// JavaScript provides a lot of good functionality to parse/include
			// arbitrary HTML.  We don't need to try so hard!
			var content = parseComponent(html);
			console.log(content); // Take a look at the parsed node in the console!

			var close = vNode("button", {id:"close-button", onClick: "Modal.unMount();"}, "Close");
			var node = vNode("div", {id: "positionedModal",className:"modal"}, [close]);
				
			// Do the DOM things.
			var container = createElement(node);
			container.appendChild(content);
			this.root.appendChild(container);
			mount();
		}
	}
	

	Modal.unMount = unMount;
	Modal.mount = mount;
	
	return Modal;
})();