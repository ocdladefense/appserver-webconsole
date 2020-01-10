define("modal", function() {
	
	return {
		routes: [],
		
		jsx: ["component/ModalComponent.js"], // Will get run through the loadJsx() function in app.js.
		
		files: ["src/Modal.js","src/PositionedModal.js"],
		
		tools: [],
		
		data: []
	};
	
});