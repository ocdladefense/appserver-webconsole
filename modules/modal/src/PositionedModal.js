'use strict';



class PositionedModal extends Modal {
  constructor(content,position,renderOption) {
  	var renderOption = renderOption === false ? false : true;
    super(
    	{
    		content: content,
    		position: position,
    	},
    	renderOption
    );
    
    this.pos = position;
  }


}