var DatabaseArray = (function(){


	var autoIncrement = 0;

	function saveToDatabase(body){
			var today = new Date();
			today.getDate();
			console.log("THE BODY "+body);
			app.database["date"] = today;
			app.database["body"] = body;
			console.log(app.database);
	}


	var dbArray = {
		name: null,
		

		tables:{
			

		},

		note: {
			timeStamp:2999,
			body:"hello from mars"
		},

		addTable: function(name){
			this.tables[name] = {};
		},
	
	
		getTable: function(tableName){
				var table = this.tables[tableName];
				if(table == null){
					throw new Error("Table is undefined" + "  "+ tableName);
				}
				return table;
		},

		addRecord:function(record, name){
				var table = this.getTable(name);
				var id = record.id || autoIncrement++;
				var created = record.created || Date.now();
				record.id = id;
				record.created = created;

				table[record.id] = record;

				return record;
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
				console.log(this.tables);
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
		this.name = init.name;
		console.log(init.tables);

		for(var name in init.tables){
			this.addTable(name);
		}
	}
	
	DatabaseArray.prototype = dbArray;

	return DatabaseArray;
})();