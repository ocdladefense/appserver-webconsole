'use strict';

class Modal {

  constructor(props,useReact) {
		this.props = props || {};
    this.useReact = useReact;
    
    this.htmlRoot = document.querySelector('body');
    this.root = createElement(vNode("div", {id:"pModalContainer"}, null));
		// this.root.addEventListener("click", () => { this.unMount() });
		this.htmlRoot.appendChild(this.root);
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
    	content: this.content,
    	pos: this.pos
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
	domRender(content) {
		// Invoke the ModalComponent with only content.
    var content = parseComponent(content);
    console.log(content); // Take a look at the node in the console!
		var container = createElement(vNode("div",{id: "positionedModal",className:"modal"}));
		container.appendChild(content);
		
    this.root.appendChild(container);
	}
}