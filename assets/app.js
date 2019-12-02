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
        this.routes[route.name] = route;
        if(route.shortcut != null){
            this.keyboardCommands[route.shortcut] = route.name;
        }
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
    executeRoute: function(theRoute, data){ 
        console.log(theRoute,data);
        modal.hide();     
        
			if(data == null && theRoute.hasParams){
					this.showModal(theRoute.form());
					return false;
            }
        //want to be able to make an http request with the content-type of the route were executing
        //fetch can take a second options paramaters
        //can set our fetch request to accept different content types
			if(typeof theRoute.dataUrl == "string" && theRoute.dataUrl.indexOf('http') === 0){
                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Accept', 'application/json');

                var myInit = { 
                    method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default' 
                  };
                  

                var req = new Request(theRoute.dataUrl, myInit);
					var resp = fetch(req);
					//will need a version of this fetch call where we can pass in this routeData
			} else {
                    var resp = Promise.resolve(new Response(theRoute.dataUrl(JSON.parse(data))));
			}
			resp.then(function(resp){
                    console.log(resp.headers[0]);
					if(resp.headers["Accept"] == "application/json"){
                    return resp.json();
                    }else{
                        return resp;
                    }
			})
			.then(function(json){
                    console.log(json);
                    if(typeof json != "string"){
                        return json;
                    }
					    return theRoute.vNodes(json);
			})
			.then(function(vNodes){
				console.log(vNodes);
				if(this.previousRoute == theRoute || null == this.previousRoute) {
                    if(typeof vNodes != "Node"){
                        document.getElementById("stage").appendChild(vNodes);
                    }

					document.getElementById("stage").appendChild(createElement(vNodes));
				} else {
					//Need to learn how replaceChild works instead of doing it this way
					document.getElementById("stage").innerHTML = "";
					document.getElementById("stage").appendChild(createElement(vNodes));
				}
            });
            this.currentRoute = null;
			this.previousRoute = theRoute;
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
}



jQuery(function(){
	app.addRoute(searchRoute);
	app.addRoute(materialsRoute);
    app.addRoute(foobarRoute);
    app.addRoute(foobarRouteHtml);
	//app.addRoute(findModule); // inside ad Route --> does the route has a commandKey associated with it
	app.init();
	// app.setKeyboardManager(kbd);
});