this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cache-v1').then(function(cache) {
            return cache.addAll([
                // Lista över filer som ska cachelagras
                '/',
                './src/index.html',
                './src/Main.js',
                './src/Start.js',
                './src/Locker.js',
                './src/manifest.json',
                './src/locker.js',
                './src/notis.js',
                './src/price.js',
                './src/Score.js',
                './src/setCookie-meters.js',
                './src/setCookies-icons.js',
                'style.css',
                // Lägg till andra filer som du vill cachelagra här
            ]);
        })
    );
});

this.addEventListener('activate', function(event) {
    // Rensa gamla cachar
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    // Om cachnamnet inte matchar det aktuella cachet, radera det
                    return cacheName.startsWith('cache-') && cacheName !== 'cache-v1';
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Hämta resurser från cache för att hantera offline-åtkomst
this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Om resursen finns i cachen, returnera den
            if (response) {
                return response;
            }
            // Om resursen inte finns i cachen, hämta den från nätverket
            return fetch(event.request);
        })
    );
});