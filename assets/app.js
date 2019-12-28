


const App = (function(){

	function isExternalRoute(route) {
		return !(typeof route.url == "function");
	}

	function isInternalRequest(req) {
		return req.url.indexOf("internal://") === 0;
	}
	
	function getContentType(resp){
		var contentType = resp.headers.get("Content-Type");
		var parts = contentType.split(";");
	
		return parts[0];
	}


	var app = {
			routes: {},

			tools: [],

			keyboardCommands:{},

			previousRoute: null,

			currentRoute: null,

			databases: {},

			defaultDatabase: null,
			
			currentDocument: null, 
			
			loadDocument:  function(docId) {
				this.currentDocument = docId;
				
				var doc = new Doc(docId);
				doc.showNotes();
				// Perform a read op on our datastore
				// Instantiate a Document object
				// Display the document in the workspace
				// Execute the route corresponds to loading and displaying Notes for that specific document.
			},

			save: function(objectStore, record) {
				var registeredHandlers = { note: null };
				var saveNote = (objectStore, record) => {
					record.docId = this.currentDocument;

					return this.getDefaultDatabase().save(objectStore, record);
				};

				registeredHandlers.note = saveNote;

				if(registeredHandlers[objectStore]) {
					return registeredHandlers[objectStore](objectStore, record);
				}
			},

			getDatabase: function(dbName){
				return this.databases[dbName];
			},

			getDefaultDatabase: function(){
				return this.defaultDatabase;
			},

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
				var ok = vNode("button", {"data-route": this.currentRoute.name,"id":"okButton"}, "OK");
				var cancel = vNode("button", {"data-route": this.currentRoute.name,"id":"cancelButton"}, "Cancel");
				vNodes.children.push(ok);
				vNodes.children.push(cancel);
				modal.render(vNodes);
				modal.show();
			},

			respondWith: function(route,req){
				// Act according to Fetch spec and wrap synthetic Response in a Promise.
				var body = route.url(req.json());
				var init = {
					status: 200,
					statusText: "Ok",
					headers: {
						"Content-Type": MIME_APPLICATION_JSON
					}
				};
				var resp = new Response(JSON.stringify(body),init);
				
				return Promise.resolve(resp);
			},
        
		
			executeRoute: function(route, data){ 
				var req, reqh, resp, resph;
			

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
					if(data) {
							req.setBody(data);
							req.setMethod("POST");
					}
				} else {
					req = new HttpRequest("internal://",route.headers,data);
					req.synthetic(true);
				}
			
				// Prepare our response to the route.
				resp = req.isSynthetic() ? this.respondWith(route,req) : req.send();

				var contentType;
				resp.then(function(resp){

					var ret;
					contentType = getContentType(resp);
					if(getContentType(resp) == MIME_APPLICATION_JSON){
						ret = resp.json();
					} else { // default is text/html
						ret = resp.text();

					}
					
					return ret;
				})
				.then((body) => {

					return route.render(body);
				})
				.then(this.render.bind(this, route))
				.then(() => {
					// Reset current Route
					this.currentRoute = null;
					this.previousRoute = route;
				});

			},


			render: function(route, obj){
				var renderMode = route.renderMode || "append";
				var targetElement = route.elementLocation || "stage";
				var stage = document.getElementById("stage");
				var oldNode = stage.firstElementChild;
				var stageContent = oldNode.cloneNode(false);

				if(route.headers.contentType == "text/html") {
					document.getElementById("stage-content").innerHTML = obj;
					return;
				} else if(renderMode == "append") {
					document.getElementById(targetElement).appendChild(createElement(obj));
				} else {
					stageContent.appendChild(createElement(obj));
					document.getElementById(targetElement).replaceChild(stageContent, oldNode);
				}
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
			},
			
			init: function(settings){

				this.addRoutes(settings["routes-enabled"]);
				
				if(settings.databases) {
					for(var i = 0, dbs=settings.databases; i<dbs.length; i++){
						this.defaultDatabase = this.databases[dbs[i].name] = Database.connect(dbs[i]);
					}
				}
				
				this.loadDocument(1);
				
				document.addEventListener("ShortcutEvent", this);
				document.addEventListener("click",this,true);
				document.addEventListener("touchstart",new DomMobileContextMenuEvent(),true);
				// document.addEventListener("click",doubletap,true);
				this.tools.push({
					name: "highlight",
					active: true,
					init: function(app){ return new DomHighlightEvent("#stage-content"); }
				});
				
				this.tools.push({
					name: "toc",
					active: true,
					init: function(app){ return new TableOfContents(); }
				});
				
				document.addEventListener("keyup",new DomDataEvent(".record-container"),true);
				document.addEventListener("contextmenu",new DomContextMenuEvent(".has-context"),true);

				domReady(this.toolManager());
			},
			
			toolManager: function(){
				var fn = function(){
					this.tools.filter((tool)=>{ return tool.active; }).forEach((tool) => { tool.init(this); });
				};
				
				return fn.bind(this);
			}
	};


	function App(){
		this.name = "ClientApp";
	}

	App.prototype = app;



	return App;
})();