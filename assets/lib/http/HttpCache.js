const HttpCache = (function(){

    const SCRIPT_PATH = "modules/webconsole";

    var urlsToCache = [
        '/webconsole',
        SCRIPT_PATH+'/assets/lib/view.js',
        SCRIPT_PATH+'/assets/lib/event.js',
        SCRIPT_PATH+'/assets/lib/Client.js',
        // SCRIPT_PATH+'/css/keyboardManager.css',
        // SCRIPT_PATH+'/css/materials.css',
        SCRIPT_PATH+'/assets/css/siteStatus.css',
        SCRIPT_PATH+'/public/app.js',
        SCRIPT_PATH+'/assets/ux/menu.js',
        SCRIPT_PATH+'/assets/ux/ux.css',
        SCRIPT_PATH+'/settings.js',
        SCRIPT_PATH+'/routes.js'
    ];
    

    function HttpCache(init) {
        this.name = typeof init === "string" ? init : init.name;
        this.urlsToCache = urlsToCache;
        this.enabled = init.enabled;
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
      	if(!this.enabled) return;
				self["caches"].open(this.name)
				.then((cache) => {
						console.log('Opened cache');
						return cache.addAll(this.urlsToCache);
				})
      }, 
       
			handleEvent: function(event) {
				if(!this.enabled) return false;
				
				event.respondWith(
					caches.match(event.request)
					.then(function(response) {
						// Cache hit - return response
						if (response) {
							return response;
						}

						return fetch(event.request).then(
							(response) => {
								// Check if we received a valid response
								if(!response || response.status !== 200 || response.type !== 'basic') {
									return response;
								}

								// IMPORTANT: Clone the response. A response is a stream
								// and because we want the browser to consume the response
								// as well as the cache consuming the response, we need
								// to clone it so we have two streams.
								var responseToCache = response.clone();

								caches.open("mycache")
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