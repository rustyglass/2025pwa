self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('2025-reading-challenge').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/offline.html',
        '/styles.css',
        'https://cdn.glitch.global/322f0f24-3e28-4f9a-8ca5-b48819892fea/icon-192x192.png?v=1723049999866',
        'https://cdn.glitch.global/322f0f24-3e28-4f9a-8ca5-b48819892fea/icon-512x512.png?v=1723050522183',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});

