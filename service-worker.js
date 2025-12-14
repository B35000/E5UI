// /* eslint-disable no-restricted-globals */
// /* eslint-disable import/no-anonymous-default-export */
// /* --- CONFIG --- */
// const VERSION = "v1.0.0";
// const STATIC_CACHE = `static-cache-${VERSION}`;
// const RUNTIME_CACHE = `runtime-cache-${VERSION}`;

// /* --- FILES TO PRECACHE IMMEDIATELY --- */
// /* You can leave this empty; dynamic caching handles JS/CSS automatically */
// const PRECACHE_URLS = [
//   "/",                 // SPA fallback
//   "/index.html",
// ];

// /* --- INSTALL --- */
// self.addEventListener("install", event => {
//   event.waitUntil(
//     caches.open(STATIC_CACHE).then(cache => {
//       return cache.addAll(PRECACHE_URLS);
//     })
//   );

//   self.skipWaiting();
// });

// /* --- ACTIVATE --- */
// self.addEventListener("activate", event => {
//   event.waitUntil(
//     caches.keys().then(keys =>
//       Promise.all(
//         keys
//           .filter(key => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
//           .map(key => caches.delete(key))
//       )
//     )
//   );

//   self.clients.claim();
// });

// /* --- FETCH HANDLER --- */
// self.addEventListener("fetch", event => {
//   const req = event.request;
//   const url = new URL(req.url);

//   // Only cache GET requests
//   if (req.method !== "GET") return;

//   // Always return index.html for client-side routing
//   if (url.origin === location.origin && url.pathname === "/") {
//     event.respondWith(
//       caches.match("/index.html").then(cached => cached || fetch(req))
//     );
//     return;
//   }

//   /* --- DYNAMIC CACHING LOGIC --- */
//   const isBuildAsset =
//     url.pathname.endsWith(".js") ||
//     url.pathname.endsWith(".css") ||
//     url.pathname.endsWith(".wasm") ||
//     url.pathname.endsWith(".json") ||
//     url.pathname.includes("/static/");

//   if (isBuildAsset && url.origin === location.origin) {
//     event.respondWith(cacheThenNetwork(req));
//   } else {
//     // Default: network first, fallback to cache
//     event.respondWith(networkFirst(req));
//   }
// });

// /* --- HELPERS --- */

// // Stale-While-Revalidate for build assets
// async function cacheThenNetwork(req) {
//   const cache = await caches.open(RUNTIME_CACHE);
//   const cached = await cache.match(req);

//   const fetchPromise = fetch(req)
//     .then(res => {
//       if (res.ok) cache.put(req, res.clone());
//       return res;
//     })
//     .catch(() => null);

//   return cached || fetchPromise;
// }

// // Network-first for external or dynamic data
// async function networkFirst(req) {
//   const cache = await caches.open(RUNTIME_CACHE);

//   try {
//     const res = await fetch(req);
//     if (res.ok) cache.put(req, res.clone());
//     return res;
//   } catch (err) {
//     const cached = await cache.match(req);
//     return cached || new Response("Offline", { status: 503 });
//   }
// }