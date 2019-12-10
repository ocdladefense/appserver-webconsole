const App = (function(){

	function isExternalRoute(route) {
		return !(typeof route.url == "function");
	}


	function isInternalRequest(req) {
		return req.url.indexOf("https://localhost") === 0;
    }
    
    function getContentType(resp){
        var contentType = resp.headers.get("Content-Type");
        var parts = contentType.split(";");
        
        return parts[0];
    }
    function saveToDatabase(body){
        var today = new Date();
        today.getDate();
        console.log("THE BODY "+body);
        app.database["date"] = today;
        app.database["body"] = body;
        console.log(app.database);
    }


	var app = {
			routes: {},

			keyboardCommands:{},

			previousRoute: null,

            currentRoute: null,

            database: {
                "materials": [],
                "notes":[],
                "sitestatus":[]
            },

            note: {
                timeStamp:2999,
                body:"hello from mars"
            },
            
            
            getTable: function(tableName){
                var table = this.database[tableName];
                return table;
            },
            addRecord:function(record, name){
                var table = this.getTable(name);
                table.push(record);
            },
            getRecords: function(tableName){
                return this.database[tableName];
            },
            persistTable: function(tableName){
                //grab pointer to local mySql database
            },
            updateRecord: function(record, tableName){
                //update the database
            },
            dumpTable:function(tableName){
                console.log(this.database[tableName]);
            },

            //define save method that pushes stuff onto the database array
            
            getDatabase: function(){
                return this.database;
            },

            saveToDatabase: function(record,tableName){
                var today = new Date();
                var record = {
                    body: record,
                    time: today.getDay()
                };
                this.addRecord(record,tableName);
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
                console.log(this.routes);
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
                    if(data) {
                        req.setBody(data);
                        req.setMethod("POST");
                    }
				} else {
					req = new HttpRequest("https://localhost",route.headers,data);
					req.synthetic(true);
				}
			
				// Prepare our response to the route.
				resp = req.isSynthetic() ? this.respondWith(route,req) : req.send();
				console.log(resp);
				var contentType;
				resp.then(function(resp){
					// console.log(resp.headers[0]);
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
                    console.log("Response body is: ",body);
                    if(route.dataStore != null){
                        this.saveToDatabase(body,route.dataStore);
                    }
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
				
				console.log(obj);
				if(route.headers.contentType == "text/html") {
					document.getElementById("stage-content").innerHTML = obj;
					return;
				}
				if(null == this.previousRoute || this.previousRoute != this.currentRoute) {
					//Need to learn how replaceChild works instead of doing it this way
					document.getElementById("stage-content").innerHTML = "";
					document.getElementById("stage-content").appendChild(createElement(obj));
				} else {
					document.getElementById("stage-content").appendChild(createElement(obj));
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
			}
	};


	function App(){
		this.name = "ClientApp";
	}

	App.prototype = app;



	return App;
})();