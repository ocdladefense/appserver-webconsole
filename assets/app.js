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
        var ok = vNode("button", {"data-route": this.currentRoute.name}, "OK");
        var cancel = vNode("button", {"data-route": this.currentRoute.name}, "Cancel");
        vNodes.children.push(ok);
        vNodes.children.push(cancel);
        var form = createElement(vNodes);
        
    },

    executeRoute: function(theRoute, data){ 
			const routeData = ''; 
			if(!data && theRoute.hasParams){
					this.showModal(theRoute.form());
					return false;
			}
		
			if(typeof theRoute.dataUrl == "string" && theRoute.dataUrl.indexOf('http') === 0){
					var resp = fetch(theRoute.dataUrl);
					//will need a version of this fetch call where we can pass in this routeData
					console.log(theRoute);
			} else {
					var resp = Promise.resolve(new Response(theRoute.dataUrl()));
							//console.log(resp.json());
			}
			resp.then(function(resp){
					//console.log(resp);
					return resp.json();
			})
			.then(function(json){
					console.log(json);
					return theRoute.vNodes(json);
			})
			.then(function(vNodes){
				console.log(vNodes);
				if(this.previousRoute == theRoute || null == this.previousRoute) {
					document.getElementById("stage").appendChild(createElement(vNodes));
				} else {
					//Need to learn how replaceChild works instead of doing it this way
					document.getElementById("stage").innerHTML = "";
					document.getElementById("stage").appendChild(createElement(vNodes));
				}
			});
		
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
        console.log(theRoute);
        this.executeRoute(theRoute, routeData);
		},
		
		dom: {
			isRouteElement: function(elem){
				return elem.dataset && elem.dataset.route;
			}
		},

    processRoute: function(name){
        this.currentRoute = this.getRoute(name);
        var routeData;
        
        if(this.currentRoute != null){
					routeData = this.currentRoute.formCallback();
        }

        return [this.currentRoute, routeData];
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
	//app.addRoute(findModule); // inside ad Route --> does the route has a commandKey associated with it
	app.init();
	// app.setKeyboardManager(kbd);
});