const CACHE_DYNAMIC = "v2.1";

self.addEventListener("install", function (event) {});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.map(function (key) {
                    if (key !== CACHE_DYNAMIC) {
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
        caches.match(event.request).then((data) => {
            return (
                data ||
                fetch(event.request).then(function (res) {
                    return caches.open(CACHE_DYNAMIC).then(function (cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    });
                })
            );
        })
    );
});
