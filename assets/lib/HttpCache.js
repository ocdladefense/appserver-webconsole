const HttpCache = (function(){

    const SCRIPT_PATH = "modules/webconsole/assets";

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
    

    function HttpCache(init) {
        this.name = init.name;
        this.urlsToCache = urlsToCache;
        if(!init.name) {
            throw new Error("No name found.");
        }
    };

    var httpCache = {

        name: null,

        urlsToCache: [],

        setUrlsToCache: function(urls) {
            this.urlsToCache = urls;
        }

    };

    HttpCache.prototype = httpCache;

    return HttpCache;
})();

