/*
Service worker
 */ 

const SCRIPT_PATH = "modules/webconsole/assets";
var networkStatus = true;

self.onmessage = function(e){
	var data = e.data;
	console.log("Service Worker message is: ",e);
	if(data.command == "connected") {
		networkStatus = data.message;
		console.log("Updated network status to: "+data.message);
	}
}
self.importScripts(SCRIPT_PATH + "/worker/settings.js");
self.importScripts(SCRIPT_PATH + "/lib/Server.js");
self.importScripts(SCRIPT_PATH + "/lib/HttpCache.js");
self.importScripts(SCRIPT_PATH + "/lib/database/DatabaseIndexedDb.js");


const myServer = new Server({version:0.01});
myServer.setCache(new HttpCache({ name: 'my-site-cache-v1' }));
myServer.setDatabase(new DatabaseIndexedDb(databaseSettings));
self.addEventListener('install', myServer.getInstaller());


self.addEventListener("activate",function(event) {
	event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });
