

// If I want to customize a previously defined route
var materials = {
 url: '/get-json-materials?sample-event',
 name: 'materials',
 render: show,
 shortcut: 'm'// implied Ctrl-m
};

 var bon = {
    name: "bon",
    
    hasParams: true,
    
    method: "GET",
    
    headers: {
    	accept: "text/html"
    },

    //
    url: "/content/static/bon/sex-cases/chapter-1.html",
    
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



// Custom db definition.
/*
const mydb = {
	name: "mydb",
	driver: "DatabaseArray",
	tables: {
		notes: {},
		snippets: {},
		statuses: {},
		documents: {}
	}
};
*/


// Custom db definition.
const mydb = {
	name: "mydb",
	driver: "DatabaseIndexedDb",
	stores: ["customer","note","document"] // need our config to specify individual store access
};



const clientSettings = {
	"routes-enabled": [search,materials,noteRoute,docRoute,testHtml,bon],
	databases: [mydb]
};
// Uncomment if you want find enabled, too.
// clientSettings["routes-enabled"].push(findModule);




if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}





/*

<ul>
<li class="toclevel-1 tocsection-1"><a href="#Introduction"><span class="tocnumber">1</span> <span class="toctext"><b>Introduction</b></span></a></li>
<li class="toclevel-1 tocsection-7"><a href="#Alone_With_the_Client"><span class="tocnumber">2</span> <span class="toctext"><b>Alone With the Client</b></span></a></li>
<li class="toclevel-1 tocsection-15"><a href="#Involving_Others"><span class="tocnumber">3</span> <span class="toctext"><b>Involving Others</b></span></a></li>
<li class="toclevel-1 tocsection-18"><a href="#Next_Steps"><span class="tocnumber">4</span> <span class="toctext"><b>Next Steps</b></span></a></li>
</ul>
*/






