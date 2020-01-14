'use strict';



class PositionedModal extends Modal {
  constructor(content,position,renderOption,className) {
  	var renderOption = renderOption === false ? false : true;
    super(
    	{
    		content: content,
			position: position,
			className: className
    	},
    	renderOption
    );
    
	this.pos = position;
  }
}