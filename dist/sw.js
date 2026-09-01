// Self-unregistering Service Worker for s6pa1rta3n-lab.github.io
// Ensures total isolation and explicit bypass for /roof4u/ and all sub-projects.

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    Promise.all([
      self.registration.unregister(),
      'caches' in self ? caches.keys().then(function(names) {
        return Promise.all(names.map(function(name) { return caches.delete(name); }));
      }) : Promise.resolve(),
      self.clients.matchAll({ type: 'window' }).then(function(clients) {
        clients.forEach(function(client) {
          try {
            if (client.url) {
              var clientUrl = new URL(client.url);
              var clientPath = clientUrl.pathname;
              try { clientPath = decodeURIComponent(clientPath); } catch(e) {}
              if (!/^\/+roof4u(\/.*)?$/i.test(clientPath)) {
                // Non-roof4u client windows remain unaffected
              }
            }
          } catch(e) {}
        });
      })
    ])
  );
});

// Explicit bypass for /roof4u/ in case fetch is ever intercepted
self.addEventListener('fetch', function(event) {
  try {
    var url = new URL(event.request.url);
    var pathname = url.pathname;
    try { pathname = decodeURIComponent(pathname); } catch(e) {}
    if (/^\/+roof4u(\/.*)?$/i.test(pathname)) {
      // Strictly bypass Service Worker for /roof4u/ sub-project
      return;
    }
  } catch(e) {}
});
