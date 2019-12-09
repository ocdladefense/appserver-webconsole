const DatabaseArray = (function(){



	var dbArray = {
		name: null,
		
		database: {
			materials: [],
			notes:[],
			statuses:[]
		},

		note: {
			timeStamp:2999,
			body:"hello from mars"
		},
	
	
		getTable: function(tableName){
				var table = this.database[tableName];
				return table;
		},
		addRecord:function(record, name){
				var table = this.getTable(name);
				table.push(record);
		},
		getRecords: function(tableName){
				return this.database[tableName];
		},
		persistTable: function(tableName){
				//grab pointer to local mySql database
		},
		updateRecord: function(record, tableName){
				//update the database
		},
		dumpTable:function(tableName){
				console.log(this.database[tableName]);
		},

		//define save method that pushes stuff onto the database array
	
		getDatabase: function(){
				return this.database;
		},

		saveToDatabase: function(record,tableName){
			var today = new Date();
			var record = {
				body: record,
				time: today.getDay()
			};
			this.addRecord(record,tableName);
		}
	};
	
	dbArray.prototype = Database;
	
	
	function DatabaseArray(init){
		// set the schema; set the database name
		this.name = init;
	}
	
	DatabaseArray.prototype = dbArray;

	return DatabaseArray;
})();