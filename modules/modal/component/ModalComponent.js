'use strict';

class ModalComponent extends React.Component {

  constructor(reactProps) {
    super(reactProps);
    this.state = {
    	content: 	reactProps.content,
    	x:				reactProps.pos.x,
    	y:				reactProps.pos.y
    };
    

  }



  render() {
    // this.htmlRoot.classList.remove("hidden");
		
		return React.createElement(
			"div",
			{id: "positionedModal",className:"modal"},
			/* {id:"positionedModal", dangerouslySetInnerHTML: {__html: this.state.content} } */
			this.state.content,
			React.createElement(
				"button",
				{id:"close-button", onClick: () => { this.unMount() } },
				"Close"
			)
		);
  }


  unMount() {
    // this.htmlRoot.classList.add("hidden");
    // ReactDOM.unmountComponentAtNode(this.root);
  }
  
  
  
  componentDidMount(){
    // this.htmlRoot.classList.remove("hidden");
  }
  
}