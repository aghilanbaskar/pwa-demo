self.addEventListener('install', (event) => { // event when service worker install
    console.log( 'install', event);
    self.skipWaiting();
});

self.addEventListener('activate', (event) => { // event when service worker activated
    console.log('activate', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) { // HTTP request interceptor
    event.respondWith(fetch(event.request)); // send all http request without any cache logic
    /*event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );*/ // cache new request. if already in cache serves with cache.
});

//push messages are received in below event
self.addEventListener('push', (event) => {
    const json = JSON.parse(event.data.text())
    console.log('Push Data', event.data.text())
    self.registration.showNotification(json.header, json.options)
});
