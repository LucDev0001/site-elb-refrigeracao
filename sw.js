const CACHE_NAME = "elb-refrigeracao-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/termos.html",
  "/privacidade.html",
  "https://unpkg.com/aos@2.3.1/dist/aos.css",
  "https://unpkg.com/aos@2.3.1/dist/aos.js",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",
  // Adicione aqui os caminhos para as imagens da galeria e o logo quando os tiver
  // Ex: '/logo-192.png', '/logo-512.png', '/favicon.ico', '/galeria/foto1.jpg'
];

// Evento de Instalação: Salva os arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache aberto");
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de Fetch: Responde com o cache se disponível (Offline-first)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se encontrar no cache, retorna do cache
      if (response) {
        return response;
      }
      // Se não, busca na rede
      return fetch(event.request);
    })
  );
});

// Evento de Ativação: Limpa caches antigos
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
