'use strict';

class ModalComponent extends React.Component {
  constructor(reactProps) {
    super(reactProps);
    this.state = {
    	content: 	reactProps.content,
    	x:				reactProps.x,
    	y:				reactProps.y
    };
  }



  render() {
    const domContainer = document.querySelector('body');
    domContainer.classList.remove("hidden");

		var modal = ReactDOM.render(React.createElement(PositionedModal, {content:content,y:y}),pModalContainer);
		
    if(!document.querySelector("#pModalContainer")) {
      const pModalContainer = createElement(vNode("div", {id:"pModalContainer"}, null));
      pModalContainer.addEventListener("click", () => { this.unMount() });
      domContainer.appendChild(pModalContainer);
    }
  }



  unMount() {
    const domContainer = document.querySelector('#pModalContainer');
    domContainer.classList.add("hidden");
    ReactDOM.unmountComponentAtNode(domContainer);
  }
  
  
  
  componentDidMount(){
    const domContainer = document.querySelector('#pModalContainer');
    domContainer.classList.remove("hidden");
  }
  
}

/*
  render(){

    // React.createElement("button", {id:"close-button", onClick: () => { this.unMount() } }, " Close ");
    return React.createElement(
      "div",
      {id:"positionedModal", dangerouslySetInnerHTML: {__html: this.state.content} });
  }
  */