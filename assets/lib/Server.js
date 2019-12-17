/*
Server prototype

A server should provide access to one or more services (caching, database, etc.)
The server constructor should be able to take a configuration objects ( a definition of what the server will do.)
 */ 


const Server = (function(){


    // Private variables.
    const SOFTWARE_VERSION = 0.01;



    // Instance properties
    var server = {
        name: null,


        services: {},

				hasService: function(name){
					return !!(this.services[name]);
				},

        version: null,

        
        register: function(registration) {

        },


        install: function(worker) {


        },

        

    };


    // Constructor
    function Server(init){
        this.version = init.version || 0.00;

    }



    // Public/static 
    Server.time = function(){
        return Date.now();
    };


    



    return Server;

})();
