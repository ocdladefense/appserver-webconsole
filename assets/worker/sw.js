/*
Service worker
 */ 

const SCRIPT_PATH = "modules/webconsole/assets";
var networkStatus = true;

self.onmessage = function(e){
    console.log("VALUE OF E ",e);
    networkStatus = e.data;
}

self.importScripts(SCRIPT_PATH + "/lib/Server.js");


const myServer = new Server({version:0.01});

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/webconsole',
    SCRIPT_PATH+'/lib/view.js',
    SCRIPT_PATH+'/lib/event.js',
    SCRIPT_PATH+'/lib/client.js',
    SCRIPT_PATH+'/css/keyboardManager.css',
    SCRIPT_PATH+'/css/materials.css',
    SCRIPT_PATH+'/css/siteStatus.css',
    SCRIPT_PATH+'/css/ux.css',
    SCRIPT_PATH+'/app.js',
    SCRIPT_PATH+'/menu.js',
    SCRIPT_PATH+'/settings.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
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
