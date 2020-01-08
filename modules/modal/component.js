'use strict';

class Modal extends React.Component{
  constructor(reactProps) {
    super(reactProps);
  }
  render() {
    return React.createElement("div",{id:"pModalContainer"});
  }
}

class PositionedModal extends React.Component{
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