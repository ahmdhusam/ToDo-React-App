const CACHE_STATIC = "v1";
const filesPath = [
    "/",
    "/favicon.ico",
    "/icon-192x192.png",
    "/icon-256x256.png",
    "/icon-384x384.png",
    "/icon-512x512.png",
    "/manifest.json",
    "/static/js/bundle.js",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_STATIC).then((cach) => {
            cach.addAll(filesPath);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.map(function (key) {
                    if (key !== cacheStatic) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        fetch(event.request).catch(function (err) {
            return caches.match(event.request);
        })
    );
});
