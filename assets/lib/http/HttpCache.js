const HttpCache = (function(){
    

    function HttpCache(init) {
        this.name = typeof init === "string" ? init : init.name;
        this.urlsToCache = init.startUrls || [];
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
				self["caches"].open(this.name)
				.then((cache) => {
						console.log('Opened cache');
						return cache.addAll(this.urlsToCache);
				})
      }, 
       
			handleEvent: function(event) {
			
				event.respondWith(
					self["caches"].match(event.request)
					.then((response) => {
						// Cache hit - return response
						return response ? response : this.cacheRoutine(event);
					})
				);
			},
			
			cacheRoutine: function(event){
				if(!this.enabled) return fetch(event.request);
				
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
			}
		};


    HttpCache.prototype = httpCache;

    return HttpCache;
})();