const serverSettings = {

};

const cacheSettings ={

};



const storeDefinitions = [
	{
		name:"customers",
		autoIncrement:false,
		keyPath:"ssn",
		indexes:[
			{name:"name",path:"name", options:{ unique:false }},
			{name:"email",path:"email", options:{ unique: true }}
		]
	},
	{
		name:"notes",
		autoIncrement:true,
		keyPath:"id",
		indexes:[
			{name:"name",path:"name", options:{ unique:false }},
			{name:"age",path:"age", options:{ unique: false }},
			{name:"hairColor",path:"hairColor", options:{ unique: false }}
		]
	}
];


const databaseSettings={
	name: "my-db-v1",
	version:1,
	driver:"DatabaseIndexedDb",
	stores: ["customers","notes"], // for this database object only give access to these names object stores.
	schemas: storeDefinitions // used specifically to create/upgrade the database
};
