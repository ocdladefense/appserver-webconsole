const DatabaseIndexedDb = (function(){

	var database = {
		name: null,

		version: null,

		stores:[],
		
		schemas: [],
	
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

				this.schemas.forEach((store) => {
					var objectStore;
					if(!store.autoIncrement){
						objectStore = db.createObjectStore(store.name, {keyPath:store.keyPath});
					}
					else{
						objectStore = db.createObjectStore(store.name,{keyPath:store.keyPath, autoIncrement:true});
					}
					store.indexes.forEach(function(index){
						objectStore.createIndex(index.name,index.path,index.options);
					});
				});
			};

			return request;
		},

		addRecord: function(store, objs){

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

		getRecord: function(store,key,index){
			var request = indexedDB.open(this.name, this.version);	
			request.onerror = function(event) {
				// Handle errors!
			};
			request.onsuccess = function(event) {
				var db = event.target.result;
				var transaction = db.transaction([store]);
				var objectStore = transaction.objectStore(store);
				var request;
				var data = [];
				if(!index)
				{	
					request = objectStore.get(key);
					

					request.onerror = function(event) {
						// Handle errors!
					  };
					request.onsuccess = function(event) {
						// Do something with the request.result!
						data.push(request.result);
						console.log(request.result);
					  };

				}
				else{
					var theIndex = objectStore.index(index);
					//request = theIndex.get(key);
					var singleKeyRange = IDBKeyRange.only(key);
					

					theIndex.openCursor(singleKeyRange).onsuccess = function(event) {
						var cursor = event.target.result;
						if (cursor) {
						  // cursor.key is a name, like "Bill", and cursor.value is the whole object.
						  console.log("Name: " + cursor.key + ", Hair Color: " + cursor.value.hairColor + ", Age:" + cursor.value.age);
						  data.push(cursor.value);
						  cursor.continue();
						}

					};
					
				}
				console.log(data);
				return data;
			};
		},

		deleteRecord: function(store,key){
			var request = indexedDB.open(this.name, this.version);
			request.onsuccess = function(event) {
			var db = event.target.result;
				request = db.transaction([store], "readwrite")
					.objectStore(store)
					.delete(key);
			request.onsuccess = function(event) {
					console.log("object deleted");
			
				};
			}
		},

		updateRecord:function(store,key,property,value){
			var request = indexedDB.open(this.name, this.version);
			request.onsuccess = function(event) {
				var db = event.target.result;
				var objectStore = db.transaction([store], "readwrite").objectStore(store);
				request = objectStore.get(key);

				request.onerror = function(event) {
				// Handle errors!
				};
				request.onsuccess = function(event) {
				// Get the old value that we want to update
				var data = event.target.result;
				
				// update the value(s) in the object that you want to change
				data[property] = value;

				// Put this updated object back into the database.
				var requestUpdate = objectStore.put(data);
				requestUpdate.onerror = function(event) {
					// Do something with the error
				};
				requestUpdate.onsuccess = function(event) {
					console.log("the record was updated");
				};
			};
		
		}
	},
};
	
	
	function DatabaseIndexedDb(init){
		// set the schema; set the database name
		// Database name is the minimum so throw an error if it's not defined.
		if(typeof init === "string") {
			this.name = init;
		} else {
			this.name = init.name;
			this.version = init.version;
			this.stores = init.stores;
			this.schemas = init.schemas; // Used specifically to create/upgrade IndexedDb database.
		}
		
		if(!this.name) throw new Error("DATABASE_INITIALIZATION_ERROR: No database name provided.");
	}
	
	DatabaseIndexedDb.prototype = database;
	
	return DatabaseIndexedDb;
})();