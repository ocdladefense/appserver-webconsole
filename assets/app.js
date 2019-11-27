

var promise;

        function handleFilter(e){
            var filterName = e.target.value;
            showSomeChapters(filterName); 
        }

        
               
        function testTheStage(){

        }

    var app = {
        routes: {},

        previousRoute: null,

        bg: null,

        addRoute: function(route){
            this.routes[route.name] = route;

        },

        getRoute: function(routeName){
            return this.routes[routeName];
        },

        executeRoute: function(theRoute){  
            if(typeof theRoute.dataUrl == "string" && theRoute.dataUrl.indexOf('http') === 0){
                var resp = fetch(theRoute.dataUrl);
            }
            else
            {
                var resp = Promise.resolve(new Response(theRoute.dataUrl()));
                   //console.log(resp.json());
            }
            resp.then(function(resp){
                console.log(resp);
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
            })
        },

        handleEvent: function(e){
            var target = e.target;
            var name = target.dataset.route;
            var theRoute = this.getRoute(name);
            this.executeRoute(theRoute);
        },
        
        background: function(message) {
					if(null == this.bg) {
					  this.bg = new Worker('modules/webconsole/assets/worker/worker.js');
					}
					this.bg.postMessage(message);
				}
    };


   function foobarNodes(json){
// completely ignore input
      return vNode("h1",{className:"title"},"FooBar");
   }

   
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
        vNodes: show 
    };
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
            document.addEventListener("change", handleFilter);
            app.addRoute(materialsRoute);
            app.addRoute(foobarRoute);
            document.addEventListener('click',app,true);
            //materialsButton.addEventListener("click", renderMaterials);
            //testStageButton.addEventListener("click", testTheStage);
            });