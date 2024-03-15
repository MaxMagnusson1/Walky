
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cache-v1').then(function(cache) {
            console.log('Öppnar cache');
            return cache.addAll([
                // Lista över filer som ska cachelagras
                '/',
                '../index.html',
                '../style.css',
                '../img/correktpaket-05.png',
                '../img/litenlocker-09.png', 
                '../img/mapAsset 27@2x.png',
                '../img/bigline-07.png',
                '../img/bakgrund.png',
                '../img/skuggat-06.png',
                '../img/lockerImg.png',
                '../img/treemedtext-03.png',
                '../img/felhanteringklar-04.png',
                '../img/bild0.png',
                '../img/bild1.png',
                '../img/bild2.png',
                '../img/bild3.png',
                '../img/bild4.png',
                '../img/bild5.png',
                '../img/bild6.png',
                '../img/bild7.png',
                '../img/bild8.png',
                '../img/bild9.png',
                '../service-worker.js',
                '../src/Start.js',
                '../src/Locker.js',
                '../manifest.json',
                '../src/locker.js',
                '../src/notis.js',
                '../src/price.js',
                '../src/Score.js',
                '../src/setCookie-meters.js',
                '../src/setCookies-icons.js',
                '../src/Main.js',

                // Lägg till andra filer som du vill cachelagra här
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
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
self.addEventListener('fetch', function(event) {
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