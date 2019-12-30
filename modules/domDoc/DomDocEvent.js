const DomDocEvent = (function() {


	var domDoc = {
		
		events: {},
		
		handleEvent: function(e) {
			console.log("DOMDOC");
			
		},
		
		render: function(){
		}
	};

	DomDocEvent.prototype = domDoc;

	return DomDocEvent;

})();

