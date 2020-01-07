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

  unMount() {
    const domContainer = document.querySelector('#pModalContainer');
    domContainer.classList.add("hidden");
    ReactDOM.unmountComponentAtNode(domContainer);
  }

  render(){
    console.log("STATE Y = ",this.state.y);
    //console.log("THE CONTENT "+this.state.content);
    return React.createElement(
      "div",
      {id:"positionedModal"},
      this.state.content,
      React.createElement("button", {id:"close-button", onClick: () => { this.unMount() } }, " Close "));
  }

  componentDidMount(){
    const domContainer = document.querySelector('#pModalContainer');
    domContainer.classList.remove("hidden");
  }
  // const e = React.createElement;
// const ModalComponent extends React.Component
// ModalComponent.content(result of some fetch call here)
// ModalComponent.setParent(someNode);

   // const PositionedModal extends ModalComponent  
// PositionedModal extends Modal

}