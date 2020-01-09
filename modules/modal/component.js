'use strict';

class Modal extends React.Component{
  constructor(reactProps) {
    super(reactProps);
  }

  render(){
    const domContainer = document.querySelector('body');
    domContainer.classList.remove("hidden");

    if(document.querySelectorAll("#pModalContainer").length == 0){
      const pModalContainer = createElement(vNode("div", {id:"pModalContainer"}, null));
      pModalContainer.addEventListener("click", () => { this.unMount() });
      domContainer.appendChild(pModalContainer);

      var modal = ReactDOM.render(React.createElement(PositionedModal, {content:content,y:y}),pModalContainer);
    }
  }

  unMount() {
    const domContainer = document.querySelector('#pModalContainer');
    domContainer.classList.add("hidden");
    ReactDOM.unmountComponentAtNode(domContainer);
  }
}

class PositionedModal extends Modal{
  constructor(reactProps) {
    super(reactProps);
    this.state = {content: reactProps.content,y:reactProps.y}
  }

  render(){

    // React.createElement("button", {id:"close-button", onClick: () => { this.unMount() } }, " Close ");

    return React.createElement(
      "div",
      {id:"positionedModal", dangerouslySetInnerHTML: {__html: this.state.content} });

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