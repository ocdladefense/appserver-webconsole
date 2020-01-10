const BASE_PATH = "/modules/webconsole";

const DATA_PATH = BASE_PATH + "/content/modules";

const MODULE_PATH = BASE_PATH + "/modules";

const DEFAULT_DOC_ID = 1;

var pos;
var posFn = function(e) {
  pos = window.scrollY;

	if(pos < 100) {
		document.querySelector(".doc-title.active").setAttribute("style","display:none;");
	} else {
		document.querySelector(".doc-title.active").setAttribute("style","display:block;");	
	}
};
// window.addEventListener("scroll", posFn);


var collapse = function(e) {
	var target = e.target;
	
	if(!target.dataset || !target.dataset.controllerFor) return false;
	
	var id = target.dataset.controllerFor;
	
	var elem = document.getElementById(id);
	$(elem).toggleClass("choose");
};



function getModulePath(name) {
	return MODULE_PATH + "/" + name.toLowerCase();
}

function getModuleDataPath(name) {
	return DATA_PATH + "/" + name.toLowerCase();
}

function loadScript(src) {
	return (function(resolve,reject) {
		const script = document.createElement("script");
		document.body.appendChild(script);
		script.onload = resolve;
		script.onerror = reject;
		script.async = true;
		script.src = src;
	});
}


function jsxTemplate(text) {
	return (function(resolve,reject) {
		const script = document.createElement("script");
		script.setAttribute("type","text/babel");
		if(text) script.textContent = text;
		document.body.appendChild(script);
		/*if(src) {
			script.onload = resolve;
			script.onerror = reject;
			// script.async = true;
			script.src = src;
			resolve();
		} else {*/
			resolve();
		
	});
}

function loadJsx(src) {
	// var getScript = fetch("https://trust.ocdla.org/modules/webconsole/modules/modal/component.js");
	var getScript = fetch(src);
	
	getScript.then( (resp) => {
		return resp.text();
	});
	
	
	getScript.then( (text) => {
		var scriptPromise = new Promise(jsxTemplate(text));
		scriptPromise.then(()=>Babel.transformScriptTags);
	});
}

// trigger DOMContentLoaded
// https://ghinda.net/article/script-tags/
function scriptsDone() {
  var DOMContentLoadedEvent = document.createEvent('Event')
  DOMContentLoadedEvent.initEvent('DOMContentLoaded', true, true)
  document.dispatchEvent(DOMContentLoadedEvent)
}

function loadModule(name) {
	var path = getModulePath(name);
	var dataPath = getModuleDataPath("bon");
	var scriptPromise = new Promise(loadScript(path+"/module.js"));
	var tools = [];
	
	return scriptPromise.then( ()=> {
	
		var mod = getModule(name);
		var loading = [];
		mod.routes.forEach( (file) => {
			loading.push(path+"/"+file);
		});
		mod.files.forEach( (file) => {
			loading.push(path+"/"+file);
		});
		mod.data.forEach( (file) => {
			loading.push(dataPath+"/"+file);
		});
		tools = mod.tools;
		return loading;
	})
	.then( (paths) => {
		
		return Promise.all(paths.map( (path) => {
			return new Promise(loadScript(path));
		}));
	})
	.then( (resp) => {
	
		tools.forEach( (tool) => {
			tool.init(this);
		});
	});
}

function clearElement(element) {
	let node = document.getElementById(element)
	node.innerHTML = '';
	node.setAttribute("style", "display: none");
}


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
			
			loadModule: loadModule,

			linkManager:null,
			
			loadDocument:  function(docId) {
				var doc = new Doc(docId);
				this.currentDocument = docId;
				
				var loading = doc.load(docId);
			
				return loading.then( (html) => {
					var stageContent = document.getElementById("stage-content");
					stageContent.innerHTML = html;
				})
				.then( () => {
					doc.showNotes();
				})
				.then( () => {
					new TableOfContents();
				});
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
					console.log("for synthetic request, data is: ",data);
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
				if( null == obj ) return;
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
				
				e.preventDefault();
				
				try {
					[theRoute, routeData] = this.processRoute(name);
					if(null == routeData && target.dataset) {
						routeData = JSON.stringify(target.dataset);
					}
					this.executeRoute(theRoute, routeData);
				} catch(err) {
					e.preventDefault();
					console.log(err);
				}
				
				return false;
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
			
			// Simply by re-assigning how `loadModule` will be executed,
			// we can directly affect the execution context; and thus the value of "this" in the
			// original loadModule function.
			loadModule:loadModule,

			init: function(settings){

				
				this.addRoutes(settings["routes-enabled"]);
				
				if(settings.databases) {
					for(var i = 0, dbs=settings.databases; i<dbs.length; i++){
						this.defaultDatabase = this.databases[dbs[i].name] = Database.connect(dbs[i]);
					}
				}
				
				this.linkManager = new LinkHandler();
				loadModule("doc")
				.then( () => {
					this.addRoute(docRoute); // docRoute is now in global space.
				})
				.then(this.loadDocument.bind(this,DEFAULT_DOC_ID))
				.then(loadModule.bind(this,"ors"));
				//The above is equal to this.loadModule("ors")


				
				// Make this part of the loadModule routine so
				// that react components, especially those written in JSX are
				//  loaded too.
				// loadJsx("/modules/webconsole/modules/modal/component.js");

				document.addEventListener("ShortcutEvent", this);
				document.addEventListener("click",this,true);
				document.addEventListener("touchstart",new DomMobileContextMenuEvent(),true);
				// document.addEventListener("click",doubletap,true);
				
				this.tools.push({
					name: "highlight",
					active: true,
					init: function(app){ return new DomHighlightEvent("#stage-content"); }
				});
				

				
				document.addEventListener("keyup",new DomDataEvent(".record-container"),true);
				document.addEventListener("contextmenu",new DomContextMenuEvent(".has-context"),true);
				document.addEventListener("click", this.linkManager, true);

				domReady(this.toolManager());
				document.addEventListener("click",collapse,true);
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
