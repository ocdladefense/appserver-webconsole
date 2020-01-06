'use strict';





class StatuteComponent extends React.Component {
  constructor(reactProps) {
    super(reactProps);

    this.state = { text: reactProps.text, x: reactProps.x, y:reactProps.y}
  }

  unMount() {
      console.log(this.state);
    //   this.state.text = "";
      const domContainer = document.querySelector('#stage');
      // domContainer.classList.add("hidden");


    //   ReactDOM.render(
    //     e(this.render),
    //     domContainer
    //   );


    //   ReactDOM.render(
    //     React.createElement(StatuteComponent, { text: ""}),
    //     domContainer
    //   );
    // let container = ReactDOM.findDOMNode(this);
    ReactDOM.unmountComponentAtNode(domContainer);
  }


  render() {
		// const domContainer = document.querySelector('#stage');
		// domContainer.classList.remove("hidden");
  
  
    var theText = this.state.text;

    
    // There's a way to make this work now, even though we're using the "standalone" babel.
    // We'll move to webpack, etc. on Thursday.
		// return <h1>Hello, world!</h1>;

    return React.createElement(
        "div", 
        { id: "statuteContainer"}, 
        React.createElement("div", null, theText),
        React.createElement("button", { onClick: () => { this.unMount() } }, 
        " Close ")
    );
  }
}


// PositionedModal --> this is a modal 
class PositionedModal extends React.Component {
  constructor(reactProps) {
    super(reactProps);
    this.state = { text: reactProps.text, x: reactProps.x, y:reactProps.y}
  }

  render(){
    return React.createElement("div",{id:"positionedModal"},"hello modal");
  }
  // const e = React.createElement;
// const ModalComponent extends React.Component
// ModalComponent.content(result of some fetch call here)
// ModalComponent.setParent(someNode);

   // const PositionedModal extends ModalComponent  
	// PositionedModal.Location
	// PositionedModal.x
	// PositionedModal.y
// PositionedModal extends Modal

}