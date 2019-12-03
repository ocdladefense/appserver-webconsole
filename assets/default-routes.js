var test = {
	name: "foobar",
	
	hasParams: true,
	
	headers: {
		accept: "application/json",
		contentType: "application/json"
	},

	url: function(body) {
		return JSON.stringify("world");
	}, // let's not have to call out to external server, will be nice for tesitng, too.
	
	render:  function(data){ 
		return vNode("h2",{},data);
	},
	
	form: function() {
		return vNode("div",{"id":"modalContainer"},[vNode("input",{name:"url",id:"urlInput"}, [])]);
	},
	
	formCallback:function(){
		var data = document.getElementById("urlInput").value;
		return JSON.stringify({url:data});
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
	 url: 'http://appserver/get-json-materials?sample-event',
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