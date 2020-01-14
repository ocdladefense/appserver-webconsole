'use strict';

class ModalComponent extends React.Component {

  constructor(reactProps) {
    super(reactProps);
    this.state = {
		content: reactProps.content,
		className: "modal",
    	x: reactProps.position.x,
		y: reactProps.position.y
		
	};
  }

  render() {
    
		var liveDangerously, dangerousHtml;
		
		dangerousHtml = {
			__html: this.state.content
		};
		
		liveDangerously = React.createElement(
			"div", {
				id: "Ima-separate-container-for-dangerous-content",
				className: "modal-content",
				dangerouslySetInnerHTML: dangerousHtml
			}
		);
		var offsetY = 0;
		
		offsetY = this.getOffsetY(this.state.y,screen.height);

		var styles = {
			top:this.state.y - offsetY,
			left:this.state.x
			};
		return React.createElement(
			"div",
			{id: "my-modal",className: this.state.className,style:styles},
			liveDangerously,
			React.createElement(
				"button",
				{id:"close-button", onClick: () => { Modal.unMount() } },
				"Close"
			)
		);
  }
  getOffsetY(clientY,screenHeight){
		var topEdgeProximity;
		var bottomEdgeProximity;
		var threshold = 150;
		var yOffset = 0;
		var fixedHeaderHeights = 113;
		var fixedFooterHeights = 25;
		var availableHeight = screenHeight - (fixedHeaderHeights+fixedFooterHeights);

		var cushion = 15;
		
		//bottom
		bottomEdgeProximity = availableHeight - clientY;
		topEdgeProximity = clientY - fixedHeaderHeights;
		if(bottomEdgeProximity < threshold){
			yOffset = threshold - bottomEdgeProximity + cushion;
		}
		else if(topEdgeProximity < threshold){
			yOffset = -(threshold + topEdgeProximity);
		}
		return yOffset;
  }

  componentDidMount(){
	  setTimeout(() => this.setState({className:"modal slide-in"}),30);
  }
}