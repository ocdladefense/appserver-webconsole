const MIME_APPLICATION_JSON = "application/json";
const MIME_TEXT_HTML = "text/html";


const HttpRequest = (function(){


	var defaultHeaders = {
		"Accept":"application/javascript"
	};


	var _HttpRequest = {
		url: null,
	
		body: null,
	
		sent: false,
	
		params: {
	
		},
	
		headers: {
	
		},
		
		_synthetic: false,
	  
	  setContent:function(contentType){
	  	this.headers["Content-Type"] = contentType;
	  },
	  
		newRequest: function() {
			headreq = new Headers();
			headreq.append('Content-Type', this.headers["Content-Type"] || MIME_APPLICATION_JSON);
			headreq.append('Accept', this.headers["Accept"] || MIME_APPLICATION_JSON);

			var init = { 
				method: 'GET',
				headers: this.headers,
				mode: 'cors',
				cache: 'default'
			};
			
			if(this.body) {
				init['body'] = this.body;
			}
	
			return new Request(this.url, init);
		},
	  
	  
	  synthetic: function(bool){
	  	this._synthetic = true;
	  },
	  
	  
		send: function() {
			var req, resp;
			req = this.newRequest();
			
			if(!this._synthetic) {
				resp = fetch(req);
			} else {
				// var reqBody = req.json();
				// var respBody = cb(reqBody);
				resp = new Response(JSON.stringify({content:"foobar"}));
			}
			this.sent = true;
			
			// Act according to Fetch spec and wrap synthetic Response in a Promise.
			return this._synthetic ? Promise.resolve(resp) : resp;
		},
		
		
		setBody: function(body){
			this.body = body;
		}
	};


	function HttpRequest(url,init,body) {
		this.url = url || "";
		this.headers = init.headers || defaultHeaders;
		this.body = body || null;
	}
	
	HttpRequest.prototype = _HttpRequest;


	return HttpRequest;
})();