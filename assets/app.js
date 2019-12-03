const App = (function(){

	function isExternalRoute(route) {
		return typeof route.dataUrl == "string" && route.dataUrl.indexOf('https') === 0;
	}


	function isInternalRequest(req) {
		return req.url.indexOf("https://localhost") === 0;
	}


	var app = {
			routes: {},

			keyboardCommands:{},

			previousRoute: null,

			currentRoute: null,

		

			hasCommand: function(letter){
					if(this.route[shortcut] == letter){
					return true;
			}
					return false;
			},

			executeCommand: function(letter){
					if(this.hasCommand(letter)){
							this.keyboardCommands[letter]();
					}
			},

			setKeyboardManager: function(kbd){
							this.KeyboardManager = kbd;
							document.addEventListener('keydown',this.KeyboardManager);
			},

			getRouteNameByShortcut: function(shortcut){
					return this.keyboardCommands[shortcut];

			},

			bg: null,

			init: function(){
					document.addEventListener("ShortcutEvent", this);
					document.addEventListener('click',this,true);
			},

			addRoute: function(route){
				this.addRoutes(route);
			},
			addRoutes: function(routes){
				routes = Array.isArray(routes) ? routes : [routes];
			
				routes.forEach((route) => {
					this.routes[route.name] = route;
					if(route.shortcut != null){
						this.keyboardCommands[route.shortcut] = route.name;
					}
				});
			},


			getRoute: function(routeName){
				var r = this.routes[routeName];
				if(null == r) throw new Error("The route, "+routeName+", does not exist.");
				return this.routes[routeName];
			},

			showModal: function(vNodes){
				//will need to pass form to modal object to display on page
				//include two buttons by default -- ok and cancel
				//cancels data route may set current route to null
				var ok = vNode("button", {"data-route": this.currentRoute.name,"id":"okButton"}, "OK");
				var cancel = vNode("button", {"data-route": this.currentRoute.name,"id":"cancelButton"}, "Cancel");
				vNodes.children.push(ok);
				vNodes.children.push(cancel);
				//var form = createElement(vNodes);
				modal.render(vNodes);
				modal.show();
			},




		
		
			executeRoute: function(route, data){ 
				var req, reqh, resp, resph;
			
				console.log(route,data); // Give us the basics.
				modal.hide();     
				
				if(data == null && route.hasParams) { // Get user input when needed.
					this.showModal(route.form());
					return false;
				}
			
				// We want to be able to make an http request with the content-type of the route were executing
				// fetch can take a second options paramaters
				// can set our fetch request to accept different content types
				if(isExternalRoute(route)) {
					req = new HttpRequest(route.url,route.headers);
				} else {
					req = new HttpRequest("https://localhost",route.headers);
					req.synthetic(true);
				}
			
				// Prepare our response to the route.
				resp = req.send();
				console.log(resp);
			
				resp.then(function(resp){
					// console.log(resp.headers[0]);
					var ret;
					if(resp.headers["Accept"] == MIME_APPLICATION_JSON){
						ret = resp.json();
					} else { // default is text/html
						ret = resp.text();
					}
					return ret;
				})
				.then(function(json){
					console.log(json);
					if(typeof json != "string"){
						return json;
					}
					return route.render(json);
				})
				.then(this.render.bind(this))
				.then(() => {
					// Reset current Route
					this.currentRoute = null;
					this.previousRoute = route;
				});

			},


			render: function(objn){
				
				console.log(objn);
		
				//if(this.previousRoute == this.currentRoute || null == this.previousRoute) {
					
				//} else {
					//Need to learn how replaceChild works instead of doing it this way
					document.getElementById("stage").innerHTML = "";
					document.getElementById("stage").appendChild(createElement(objn));
				//}
			},


			handleEvent: function(e){
				var target = e.target;
				var name;
				var theRoute;
				var routeData;

				
				if(e.type == "click" && this.dom.isRouteElement(target)) {
						name = target.dataset.route;
				} else if(e.type == "ShortcutEvent") {
						name = this.getRouteNameByShortcut(e.detail.keyName);   
				} else {
						return false;
				}
				
				[theRoute, routeData] = this.processRoute(name);
				this.executeRoute(theRoute, routeData);
			},


		
			dom: {
				isRouteElement: function(elem){
						return elem.dataset && elem.dataset.route;
				}
			},



			processRoute: function(name){
				var route = this.getRoute(name);
				var routeData;
		
				if(this.currentRoute != null){
					routeData = this.currentRoute.formCallback();
				}
				this.currentRoute = route;
				//this.executeRoute(this.currentRoute, routeData);
				return [this.currentRoute, routeData];
			},



			testRoute: function(name){
				[theRoute, routeData] = this.processRoute(name);
				this.executeRoute(theRoute, routeData);
			},


		
			background: function(message) {
				if(null == this.bg) {
						this.bg = new Worker('modules/webconsole/assets/worker/worker.js');
				}
				this.bg.postMessage(message);
			}
	};


	function App(){
		this.name = "ClientApp";
	}

	App.prototype = app;



	return App;
})();