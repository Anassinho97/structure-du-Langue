const CACHE = 'tcf-structure-master-v1';
const CORE = [
  './', './index.html', './manifest.webmanifest', './css/app.css',
  './js/core.js', './js/views.js', './js/session-view.js', './js/app.js',
  './assets/icon.svg', './assets/lingo.svg', ...Array.from({ length: 20 }, (_, index) => `./data/m${String(index + 1).padStart(2, '0')}.js`)
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) caches.open(CACHE).then(cache => cache.put(request, response.clone()));
    return response;
  }).catch(() => request.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
