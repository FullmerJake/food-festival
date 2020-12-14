const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];

// install event
self.addEventListener('install', function (e) {
    // tells the browser to wait until the work is complete before terminating the worker. 
    // this ensures that the service worker doesn't move on from the installing phase 
    // until it's finished executing all of its code. 
    e.waitUntil(
    // caches.open finds the specific chache by name, and then adds every file to the FILES_TO_CACHE array
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
  })

// activate service worker
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function(key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.log('deleting cache: ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});

// listens for a fetch event
self.addEventListener('fetch', function(e) {
    // logs the url of the requested resource
    console.log('fetch request: ' + e.request.url)
    // defines how we will respond to the request. 
    e.respondWith(
        // will check to see if the request is stored in the cache or not. 
        caches.match(e.request).then(function (request) {
            // if it IS stored in the cache, will deliver the resource directly from the cache. 
            if (request) {
                console.log('responding with cache: ' + e.request.url)
                return request
            }
            // otherwise, the resource will be retrieved normally.
            else {
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }
            // You can omit if/else for console.log $ put one line below like this too
            // return request || fetch(e.request)
        }) 
    )
})