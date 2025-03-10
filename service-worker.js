/**
 * Fil för seriveworker och hantering av offline åtkomst. Sätter ett filnamn på cahcen och vilka filer som ska cachelagras samt bilder.
 */
var cacheName = 'cache-v1';
var filesToCache = [
    '/',
                'style.css',
                '../img/correktpaket-05.png',
                '../img/coin2-10.png',
                '../img/coin3-10.png', 
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
                'service-worker.js',
                '../src/Start.js',
                '../src/Locker.js',
                'manifest.json',
                '../src/locker.js',
                '../src/notis.js',
                '../src/price.js',
                '../src/Score.js',
                '../src/setCookie-meters.js',
                '../src/setCookies-icons.js',
                '../src/Main.js',
]

// Installationshändelse: cachelagra alla filer som ska cachelagras
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(cacheName)
        .then(function(cache) {
          return cache.addAll(filesToCache);
        })
    );
  });
  
  /**
   *  *Aktiveringshändelse: ta bort gamla cachar. Väntar till allt är klart och retunerar ett promise som tar bort gamla cachar.Kontrollerar om
   den aktuella cachen inte matchar den gamla cachan och raderar den isåfall, loopar igenom det med map metod och raderar den.
*/
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(existingCacheName) {
            return existingCacheName !== cacheName;
          }).map(function(existingCacheName) {
            return caches.delete(existingCacheName);
          })
        );
      })
    );
  });
  
  /**
   * Fetch-händelse,  försök att hämta filer från cachar, annars från nätverket
   */ 
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Om filen finns i cachen, returnera den
          if (response) {
            return response;
          }
          // Annars hämta från nätverket och lägg till den till cachen¨
          return fetch(event.request)
            .then(function(response) {
              // Kontrollera om vi fick ett giltigt svar
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // Klona responsen
              var responseToCache = response.clone();
  
              // Lägg till den i cachen
              caches.open(cacheName)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            });
        })
    );
  });

