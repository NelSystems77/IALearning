// Service worker simple: cachea el "app shell" para que funcione sin conexión.
const CACHE_NAME = 'zero-to-hero-ia-v2';
const APP_SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './js/content.js',
  './js/state.js',
  './js/robot.js',
  './js/app.js',
  './manifest.json',
  './assets/icons/logo-nelsystems.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
