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
    document.body.classList.add("has-modal");
    
		var liveDangerously, dangerousHtml;
		
		dangerousHtml = {
			__html: this.state.content
		};
		
		liveDangerously = React.createElement(
			"div", {
				id: "Ima-separate-container-for-dangerous-content",
				dangerouslySetInnerHTML: dangerousHtml
			}
		);
		
		
		/*return React.createElement(
			"div",
			{id: "positionedModal",className:"modal"},
			this.state.content,
			React.createElement(
				"button",
				{id:"close-button", onClick: () => { this.unMount() } },
				"Close"
			)
		);
		*/
		return React.createElement(
			"div",
			{id: "positionedModal",className:"modal"},
			liveDangerously,
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