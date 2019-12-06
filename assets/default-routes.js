var test = {
	name: "foobar",
	
	hasParams: true,
	
	headers: {
		accept: "application/json",
		contentType: "application/json"
    },
    targetNodeName:null,
    targetClassName:null,
    dataStore: "notes",

    handleEvent: function(e){
        var target = e.target;
        var value;
        

        if(target.getAttribute("class") == null)
            return false;
        if(e.type == "click" && e.target.getAttribute("class").indexOf("editable") != -1){
            this.targetNodeName = target.nodeName;
            this.targetClassName = target.getAttribute("class");
            
            value = target.firstChild.nodeValue;
            var input = vNode("input",{className:"note-title",value:value},[]);

            target.parentNode.replaceChild(createElement(input),target);
        }

        if(e.type == "keyup" && e.key == "Enter"){
            var newElement = vNode(this.targetNodeName,{className:this.targetClassName},target.value);
            var theElement = createElement(newElement);
            target.parentNode.replaceChild(theElement,target);
            
            console.log("KEY UP EVENT");
        }
        console.log("HANDLE EVENT PROPERTY");
    },

	// Let's not have to call out to external server, will be nice for tesitng, too.
	url: function(params) {

		return {id:"foobar",time:2000, title:params.noteTitle, body:params.noteBody};
	},
	
	// Gets passed the body of the Response.
	render:  function(note){ 
        console.log(note);
        // body is "You chose..."
        document.addEventListener("click",this);
        document.addEventListener("keyup",this);
        var container = vNode("div",{className:"note-container"},[]);
        container.children.push(vNode("h3",{className:"note-title editable"},note.title));
        container.children.push(vNode("div",{className:"note-body editable"},note.body));
        return container;
	},
	
	form: function() {
        return vNode("div",{"id":"modalContainer"},
        [
            vNode("input",{name:"noteTitle",id:"noteTitle"}, []),
            vNode("input",{name:"noteBody",id:"noteBody"},[])
        ]);
	},
	
	formCallback:function(){
        var title = document.getElementById("noteTitle").value;
        var body = document.getElementById("noteBody").value;
		return JSON.stringify({"noteTitle":title,"noteBody":body});
	}
};
 
 
 var testHtml = {
    name: "foobar2",
    hasParams: true,
    headers: {
    	accept: "text/html"
    },

    //
    url: function(json){
        console.log(json.url);
        return "<h1>Hello World</h1>";
    }, // let's not have to call out to external server, will be nice for tesitng, too.
    render: function(json){
        return vNode("h1", {}, json);
    },
    form: function(){
        return vNode("div",{"id":"modalContainer"},[vNode("input",{"name":"url","id":"urlInput"}, [])]);
    },
    formCallback:function(){
        var data = document.getElementById("urlInput").value;
        return JSON.stringify({url:data});
    }
 };

 var materials = {
	 url: '/get-json-materials?sample-event',
	 name: 'materials',
	 render: show,
	 shortcut: 'm'// implied Ctrl-m
 };

 var search = {
     name:'test',
     url: 'http://appserver/test-function-one',
     render: function(){
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

 var database = {
     name:"database",
     url: function(){
         return app.database;
     },
     render: function(){
         return vNode("h1",{},[app.getDatabase()]);
     },
     form: function(){},
     formCallback: function(){}
 };

 var allSiteStatuses = {
	name: "all-site-statuses",
	
	hasParams: false,
	
	headers: {
		accept: "text/html",
		contentType: "text/html"
	},

	// Let's not have to call out to external server, will be nice for tesitng, too.
	url: "/site-statuses",
	
	// Gets passed the body of the Response.
	render:  function(body){ 
		return body;
	},
	
	// form: function() {
	// 	return vNode("div",{"id":"modalContainer"},[vNode("input",{name:"url",id:"urlInput"}, [])]);
	// },
	
	// formCallback:function(){
    //     var data = document.getElementById("urlInput").value;

	// 	return JSON.stringify({url:data});
	// }
};

 var siteStatus = {
	name: "site-status",

	dataStore: "sitestatus",
	
	hasParams: true,
	
	headers: {
		accept: "application/json",
		contentType: "application/json"
	},

	// Let's not have to call out to external server, will be nice for tesitng, too.
	url: "/site-status",
	
	// Gets passed the body of the Response.
	render:  function(json){ 
		// body is "You chose..."
		console.log(json);
		console.log("here");
		return vNode("h2",{},body);
	},
	
	form: function() {
		return vNode("div",{"id":"modalContainer"},[vNode("input",{name:"url",id:"urlInput"}, [])]);
	},
	
	formCallback:function(){
        var data = document.getElementById("urlInput").value;

		return JSON.stringify({url:data});
	}
};

var siteStatusCheckSite = {
	name: "site-status-check-site",
	
	hasParams: false,
	
	headers: {
		accept: "application/json",
		contentType: "text/html"
	},

	// Let's not have to call out to external server, will be nice for tesitng, too.
	url: "/site-status",
	
	// Gets passed the body of the Response.
	render:  function(body){ 
        console.log(body);
        return vNode("h2",{},body);
	},
	
	// form: function() {
	// 	return vNode("div",{"id":"modalContainer"},[vNode("input",{name:"url",id:"urlInput"}, [])]);
	// },
	
	// formCallback:function(){
	// 	var data = document.getElementById("urlInput").value;
	// 	return JSON.stringify({url:data});
	// }
};