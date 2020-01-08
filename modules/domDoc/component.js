'use strict';

class Modal extends React.Component{
  constructor(reactProps) {
    super(reactProps);
  }
  render() {
    return React.createElement("div",{id:"pModalContainer"});
  }
}


// PositionedModal --> this is a modal 
class PositionedModal extends React.Component{
  constructor(reactProps) {
    super(reactProps);
    this.state = {content: reactProps.content,y:reactProps.y}
  }

  render(){

    return React.createElement(
      "div",
      {id:"positionedModal",className:"isModal"},
      this.state.content,
      React.createElement("button", {id:"close-button",onClick: () => { this.unMount() } }, " Close "));
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