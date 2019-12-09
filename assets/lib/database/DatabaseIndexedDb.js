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