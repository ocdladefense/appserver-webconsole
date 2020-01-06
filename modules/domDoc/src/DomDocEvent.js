const DomDocEvent = (function() {


	const EXTERNAL_CONTENT_URL = "../external/";
	
	const HANDLE_URLS = ["oregonlaws.org/ors"];



	function isNodeType(e){
		if(e.target.nodeName == "A")
			return true;
		return false;
	}
	
	function isNodeLink(e){
		if( !e.target.href )
			return false;
		var givenUrl = e.target.href;

		HANDLE_URLS.forEach(url => {
			if(givenUrl.includes(url))
				return true;
		});
		return false;
	}


	var domDoc = {
		
		events: {},
		
		handleEvent: function(e) {
			var target = e.target;
			// Be careful! May need to take into account any fixed-height elements to properly calculate location.
			var x = target.screenX;
			var y = target.screenY;
			// Calculate offsets, when necessary
			// offset y by 50% of the container height;
			// offset x by 100% of the container width;
			
			if(!isNodeLink(e) && !isNodeType(e))
				return false;
			e.preventDefault();

			
			var url = new UrlParser(e.target.href);
			var statute = url.getLastPathPart();

			fetch(EXTERNAL_CONTENT_URL + statute).then( (response) => {
				return response.text();
			}).then( (text) => {
				
				// const domContainer = document.body;
				// 
				const domContainer = document.querySelector('#container-right');
				domContainer.classList.remove("hidden");
				
				// ReactDOM.render(React.createElement(PositionModal, {text:text}),domContainer);
				
				ReactDOM.render(
					React.createElement(StatuteComponent, { text: text}),
					domContainer
				);
				// let node = vNode("div",{},text);
				// let button = vNode("button", { "onclick":"clearElement('container-right')" }, []);
				// let elem = createElement(node);
				// let buttonElem = createElement(button);
				
				// container.appendChild(elem);
				// container.appendChild(buttonElem);
			});
		},
		
		render: function(){ }
	};

	function DomDocEvent() {}
	
	
	function UrlParser(url){
		let parts = url.split("://");

		this.protocol = parts[0];

		var otherParts = parts[1].split("/");

		this.domain = otherParts.splice(0,1);

		this.path = otherParts;
	}
	
	
	var proto = {
		protocol: "http",
		domain: null,
		path: null,
		queryString: null,

		getLastPathPart: function(){
			return this.path[this.path.length-1];
		}
	};


	DomDocEvent.prototype = domDoc;
	UrlParser.prototype = proto;


	return DomDocEvent;
})();