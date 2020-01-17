const serverSettings = {

};

/*
    var urlsToCache = [
        '/webconsole',
        SCRIPT_PATH+'/assets/lib/view.js',
        SCRIPT_PATH+'/assets/lib/event.js',
        SCRIPT_PATH+'/assets/lib/Client.js',
        // SCRIPT_PATH+'/css/keyboardManager.css',
        // SCRIPT_PATH+'/css/materials.css',
        SCRIPT_PATH+'/assets/css/siteStatus.css',
        SCRIPT_PATH+'/public/app.js',
        SCRIPT_PATH+'/assets/ux/menu.js',
        SCRIPT_PATH+'/assets/ux/ux.css',
        SCRIPT_PATH+'/settings.js',
        SCRIPT_PATH+'/routes.js'
    ];
*/

const SCRIPT_PATH = "modules/webconsole";

const cacheSettings = {
	name: 'mycache',
	startUrls: [
		SCRIPT_PATH+"/assets/jquery/jquery-1.11.0-min.js",
		SCRIPT_PATH+"/assets/react/babel-6.26.0-standalone.js",
		SCRIPT_PATH+"/assets/react/react-16.12.0-development.js",
		SCRIPT_PATH+"/assets/react/react-16.12.0-dom-development.js"
	]
};



const storeDefinitions = [
	{
		name:"customer",
		autoIncrement:false,
		keyPath:"ssn",
		indexes:[
			{name:"name",path:"name", options:{ unique:false }},
			{name:"email",path:"email", options:{ unique: true }}
		]
	},
	{
		name:"note",
		autoIncrement:true,
		keyPath:"id",
		indexes:[
			{name:"title",path:"title", options:{ unique:false }},
			{name:"body",path:"body", options:{ unique: false }},
			{name:"docId",path:"docId", options:{ unique: false }},
			{name:"nodeId",path:"nodeId", options:{ unique: false }},  // Integer reflecting position of paragraph in document.
		]
	},
	{
		name:"document",
		autoIncrement:true,
		keyPath:"id",
		indexes:[
			{name:"title",path:"title", options:{ unique:false }},
			{name:"body",path:"body", options:{ unique: false }},
			{name:"url",path:"url", options:{ unique: true }} // location on server
		]
	}
];



const databaseSettings={
	name: "mydb",
	version:1,
	driver:"DatabaseIndexedDb",
	stores: ["customer","note","document"], // for this database object only give access to these names object stores.
	schemas: storeDefinitions // used specifically to create/upgrade the database
};


const config = {
	database: databaseSettings,
	cache: cacheSettings,
	server: serverSettings
};