const DomDocEvent = (function() {


	var domDoc = {
		
		events: {},
		
		handleEvent: function(e) {
			if(e.target.nodeName == "A") {
				if (e.target.href.includes("oregonlaws.org/ors")) {
					e.preventDefault();

					let url = e.target.href;

					let urlParts = url.split("/");

					fetch("../external?" + urlParts[4]).then( (response) => {
						return response.text();
					}).then( (text) => {
						let node = vNode("div",{},text);
						let button = vNode("button", { "onclick":"clearElement('container-right')" }, []);
						let elem = createElement(node);
						let buttonElem = createElement(button);
						let container = document.getElementById("container-right");
						container.setAttribute("style", "display: inline-block");
						container.appendChild(elem);
						container.appendChild(buttonElem);
					});
				}
			}
		},
		
		render: function(){
		}
	};

	function DomDocEvent() {

	}

	DomDocEvent.prototype = domDoc;

	return DomDocEvent;

})();

