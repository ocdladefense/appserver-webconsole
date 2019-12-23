const HttpCache = (function(){

    const SCRIPT_PATH = "modules/webconsole/assets";

    var urlsToCache = [
        '/webconsole',
        SCRIPT_PATH+'/lib/view.js',
        SCRIPT_PATH+'/lib/event.js',
        SCRIPT_PATH+'/lib/Client.js',
        SCRIPT_PATH+'/css/keyboardManager.css',
        SCRIPT_PATH+'/css/materials.css',
        SCRIPT_PATH+'/css/siteStatus.css',
        SCRIPT_PATH+'/css/ux.css',
        SCRIPT_PATH+'/app.js',
        SCRIPT_PATH+'/menu.js',
        SCRIPT_PATH+'/settings.js'
    ];
    

    function HttpCache(init) {
        this.name = typeof init === "string" ? init : init.name;
        this.urlsToCache = urlsToCache;
        if(!this.name) {
            throw new Error("No name found.");
        }
    };

    var httpCache = {

			name: null,

			urlsToCache: [],

			setUrlsToCache: function(urls) {
					this.urlsToCache = urls;
			},
       
      init: function(){
				self["caches"].open(this.cache.name)
				.then((cache) => {
						console.log('Opened cache');
						return cache.addAll(this.cache.urlsToCache);
				})
      }, 
       
			handleEvent: function(event) {
				return false;
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
			}
		};


    HttpCache.prototype = httpCache;

    return HttpCache;
})();