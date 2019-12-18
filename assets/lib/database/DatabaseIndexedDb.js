const DatabaseIndexedDb = (function(){

	var database = {
		name: null,
		
		schema: {
			materials: [],
			notes:[],
			statuses:[]
		},

		note: {
			timeStamp:2999,
			body:"hello from mars"
		},
	
		init: function() {
			const customerData = [
				{ ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
				{ ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
			];

			var request = indexedDB.open("mydb", 1);
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

				var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

				objectStore.createIndex("name", "name", { unique: false });

				objectStore.createIndex("email", "email", { unique: true });

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
		this.name = init;
	}
	
	DatabaseIndexedDb.prototype = database;
	
	return DatabaseIndexedDb;
})();