

var promise;

        function handleFilter(e){
            var filterName = e.target.value;
            showSomeChapters(filterName); 
        }

        function renderMaterials(){

            window.promise = fetchJson(url);
            promise.then(function(json){
                showAllChapters(json.chapters);
                uiChapterPicker(json.chapters);
            });
        }

        function testTheStage(){

        }

    var app = {
        routes: [],

        registerRoute: function(route){

        },

        executeRoute: function(routeName){
            var theRoute = this.registerRoute(routeName);
            var resp = fetch(theRoute.dataUrl).then(function(json){
              return theRoute.render(json);
            }).then(function(el){
                document.getElementById("stage").appendChild(el);
            })
        },

        handleEvent: function(e){
            var target = e.target;
            var name = target.dataset.route;
            // var theRoute = this.routes[action];
            this.executeRoute(name)
        }
    };

    var materialsRoute = {
        dataUrl: 'http://appserver/get-json-materials?sample-event',
        name: 'materials',
        render: renderMaterials 
    };
     /*;
     Step 1: listening for some kind of ui event
     Step 2:  prepare to execute a route "get-json-materials"
        Step 3: callout to route using fetch
        Step 4: retrieve data text() or json()
        Step 5: render the data vnode() createElement()
        */

        jQuery(function(){
            var testStageButton = document.getElementById("testStage");
            var materialsButton = document.getElementById("materials");
            document.addEventListener("change", handleFilter);
            app.addRoute(materialsRoute);
            document.addEventListener('click',app,true);
            //materialsButton.addEventListener("click", renderMaterials);
            //testStageButton.addEventListener("click", testTheStage);
            });