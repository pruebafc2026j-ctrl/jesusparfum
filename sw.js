/* JESÚS PARFUM — trabajador de servicio (modo sin conexión)
   Guarda la tienda en el dispositivo: después de la primera visita,
   la página abre sin internet. Los enlaces a WhatsApp/TikTok y los
   datos en vivo (reseñas, contadores) sí necesitan conexión. */
const CACHE = "jesusparfum-v1";
const CORE = [
  "./",
  "recomendaciones/",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "og.jpg",
  "catalogo-jesusparfum.pdf"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // APIs externas: solo red

  /* páginas HTML: primero red (para ver cambios), si no hay red usa la copia guardada */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match("./")))
    );
    return;
  }

  /* archivos (imágenes, iconos, PDF): primero la copia guardada, luego red */
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => hit))
  );
});
