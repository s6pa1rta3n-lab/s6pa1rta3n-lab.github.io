// Self-unregistering Service Worker for s6pa1rta3n-lab.github.io
// Ensures total isolation and explicit bypass for /roof4u/ and all sub-projects.

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    self.registration.unregister().then(function() {
      return self.clients.matchAll();
    }).then(function(clients) {
      clients.forEach(function(client) {
        if (client.url && !client.url.includes('/roof4u/')) {
          client.navigate(client.url);
        }
      });
    })
  );
});

// Explicit bypass for /roof4u/ in case fetch is ever intercepted
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);
  if (url.pathname.startsWith('/roof4u') || /^\/roof4u(\/.*)?$/i.test(url.pathname)) {
    // Strictly bypass Service Worker for /roof4u/ sub-project
    return;
  }
});
