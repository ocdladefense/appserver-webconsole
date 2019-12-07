
 
 
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