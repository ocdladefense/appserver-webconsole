const serverSettings = {

};

const cacheSettings = {
	name: 'mycache'
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