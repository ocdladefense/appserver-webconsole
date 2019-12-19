const DatabaseIndexedDb = (function(){

	var database = {
		name: null,

		version: null,

		stores:[],
	
		init: function() {


			var request = indexedDB.open(this.name, this.version);
			console.log(request);

			request.onerror = function(event) {
				// Do something with request.errorCode!
			};

			request.onsuccess = function(event) {
				console.log(request.onsuccess);
			};

			request.onupgradeneeded = (event) => {
				console.log("Upgrading database");

				var db = event.target.result;

				this.stores.forEach((store) => {
					var objectStore;
					if(!store.schema.autoIncrement){
						objectStore = db.createObjectStore(store.name, {keyPath:store.schema.keyPath});
					}
					else{
						objectStore = db.createObjectStore(store.name,{autoIncrement:true});
					}
					// store.schema.indexes.forEach(function(index){
					// 	objectStore.createIndex(index.name,index.path,index.options);
					// });
				});
			};

			return request;
		},

		addData: function(store, objs){

			console.log("ADD DATA", store, objs);

			var request = indexedDB.open(this.name, this.version);

			console.log("REQUEST",request);
			
			request.onsuccess = (event) => {
				var db = event.target.result;
				var objectStore = db.transaction([store], "readwrite").objectStore([store]);
				objs.forEach((obj) => {
					objectStore.add(obj);
				});
			};
		},

		getData: function(){
			var request = indexedDB.open(this.name, this.version);	
			request.onerror = function(event) {
				// Handle errors!
			};
			request.onsuccess = function(event) {
				var db = event.target.result;
				var transaction = db.transaction(["customers"]);
				var objectStore = transaction.objectStore("customers");
				var request = objectStore.get("444-44-4444");
				request.onerror = function(event) {
					// Handle errors!
				  };
				request.onsuccess = function(event) {
					// Do something with the request.result!
					console.log("Name for SSN 444-44-4444 is " + request.result.name);
				  };
			};
		},



		getTable: function(tableName){},
		
		addRecord:function(record, name){},
		
		getRecords: function(tableName){},
		
		persistTable: function(tableName){},
		
		updateRecord: function(record, tableName){},
		
		dumpTable:function(tableName){},

		//define save method that pushes stuff onto the database array
	
		getDatabase: function(){},

		saveToDatabase: function(record,tableName){
			var today = new Date();
			var record = {
				body: record,
				time: today.getDay()
			};
			this.addRecord(record,tableName);
		}
	};
	
	
	function DatabaseIndexedDb(init){
		// set the schema; set the database name
		this.name = init.name;

		this.version = init.version;

		this.stores = init.stores;
	}
	
	DatabaseIndexedDb.prototype = database;
	
	return DatabaseIndexedDb;
})();