// sw.js - Service Worker Básico
self.addEventListener("install", (e) => {
  console.log("Service Worker instalado");
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker ativado");
});

self.addEventListener("fetch", (e) => {
  // Apenas permite que as requisições de rede passem normalmente
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
