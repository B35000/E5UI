/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-anonymous-default-export */
const CACHE_NAME = 'e5-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

const shouldCache = file =>
  file.endsWith('.js') ||
  file.endsWith('.css') ||
  file.endsWith('.json') ||
  file.endsWith('.wasm');

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin === location.origin && shouldCache(url.pathname)) {
    event.respondWith(
      caches.open('dynamic-cache-v1').then(async cache => {
        const response = await fetch(event.request);
        cache.put(event.request, response.clone());
        return response;
      })
    );
  }
});

// actitivate the service worker
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});