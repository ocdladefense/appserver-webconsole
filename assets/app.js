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
        }
        else
        {
            var resp = Promise.resolve(new Response(theRoute.dataUrl()));
                //console.log(resp.json());
        }
        resp.then(function(resp){
            //console.log(resp);
            return resp.json();
        }).then(function(json){
            console.log(json);
            return theRoute.vNodes(json);
        })
            .then(function(vNodes){
            console.log(vNodes);
            if(this.previousRoute == theRoute || null == this.previousRoute)
            {
                document.getElementById("stage").appendChild(createElement(vNodes));
            }
            else
            {
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
    
        name =  e.type != "ShortcutEvent" ? target.dataset.route : this.getRouteNameByShortcut(e.detail.keyName);   
        
        [theRoute, routeData] = this.processRoute(name);
        console.log(theRoute);
        this.executeRoute(theRoute, routeData);
        },

    processRoute: function(name){
        var theRoute = this.getRoute(name);
        
        if(this.currentRoute != null){
                var routeData = this.currentRoute.formCallback();
        }
        this.currentRoute = theRoute;

        return [theRoute, routeData];
    },
    
    background: function(message) {
        if(null == this.bg) {
            this.bg = new Worker('modules/webconsole/assets/worker/worker.js');
        }
        this.bg.postMessage(message);
    }
}

   function foobarNodes(json){
    // completely ignore input
      return vNode("h1",{className:"title"},"FooBar");
   }

   //Routes-------------------------------------------------------------------------------------------
   
    var foobarRoute = {
       name: "foobar",
       dataUrl: function(){
           var sample={
               name:"sample"
           };
           return JSON.stringify(sample);
       }, // let's not have to call out to external server, will be nice for tesitng, too.
       vNodes:  foobarNodes


    };


    var materialsRoute = {
        dataUrl: 'http://appserver/get-json-materials?sample-event',
        name: 'materials',
        vNodes: show,
        shortcut: 'm'// implied Ctrl-m
    };

    var searchRoute ={
        dataUrl: 'http://appserver/test-function-one',
        name:'test',
        vNodes: function(){
            return vNode("h1",{}, "Hello World" )
        },
        shortcut: 'f',
        hasParams:true,
        form: function(){
            return vNode("input",{}, []);
        },
        formCallback: function(){
            return JSON.stringify({url:"http://appserver/foobar"});
        }
    };

    // Unit test for a route that requires "user input"
function routeHasFormData(){
    var routeName;
    var routeData;
   //  app.hasRoute("searchRoute");  should return true
   //app.currentRoute = searchRoute; // Pretend that user has already selected this route.
   [routeName, routeData] = app.processRoute(searchRoute.name);
   app.executeRoute(routeName, routeData);

}




     /*;
     Step 1: listening for some kind of ui event
     Step 2:  prepare to execute a route "get-json-materials"
        Step 3: callout to route using fetch
        Step 4: retrieve data text() or json()
        Step 5: render the data vnode() createElement()
        */

        //steps for check site 
        /*
        step 1: User clicks on check site menu item
        step 2: Modal is displayed
        step 2a: where will we fetch the form from? possibly create form using vNodes
        step 2b: Create vnodes for modal based off of specifications for each route
        step 3: user enters in site name or id into modal pop up
        step 3a: user presses cancel
        step 4: user presses enter
        step 4a: Callback for processing entered data
        step 5: the site name gets parsed onto end of url for retrieving site status, possibly add data to the response body as well


        step 6: site status route with parsed name is executed
        step 7: response is returned in json
        step 8: vnodes are created based on response
        step 9: vnodes get processed as elements and appened to the stage





        */

        jQuery(function(){
            var testStageButton = document.getElementById("testStage");
            //var materialsButton = document.getElementById("materials");
            //document.addEventListener("change", handleFilter);
            app.addRoute(materialsRoute);
            app.addRoute(foobarRoute);
            //app.addRoute(findModule); // inside ad Route --> does the route has a commandKey associated with it
            console.log("hello");
            app.init();
            app.setKeyboardManager(kbd);
            app.addRoute(searchRoute);
            console.log(kbd);
            
            //materialsButton.addEventListener("click", renderMaterials);
            //testStageButton.addEventListener("click", testTheStage);
            });