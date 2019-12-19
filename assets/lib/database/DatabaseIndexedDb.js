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

			request.onupgradeneeded = function(event) {
				console.log("Upgrading database");

				var db = event.target.result;

				this.stores.forEach(function(store){
					var objectStore;
					if(!store.autoIncrement){
						objectStore = store.createObjectStore(store.name, {keyPath:store.keyPath});
					}
					else{
						objectStore = store.createObjectStore(store.name,{autoIncrement:true});
					}
					store.indexes.forEach(function(index){
						objectStore.createIndex(index.name,index.path,index.options);
					});
				});

				

				objectStore.transaction.oncomplete = function(event) {
					// Store values in the newly created objectStore.
					var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
					customerData.forEach(function(customer) {
					  customerObjectStore.add(customer);
					});

					console.log(customerObjectStore);
				};
			};

			return request;
		},

		getData: function(){
			var request = indexedDB.open("mydb", 1);	
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