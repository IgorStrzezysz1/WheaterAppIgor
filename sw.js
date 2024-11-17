const CACHE_NAME = 'weather-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/headJS.js',
  '/manifest.json',
  '/Images/WeatherIcon.png'
];

// Instalacja Service Workera i cache'owanie zasobów
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalacja');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache został otwarty');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Błąd przy dodawaniu zasobów do cache:', error);
      })
  );
});

// Fetchowanie zasobów z cache lub sieci
self.addEventListener('fetch', (event) => {
  console.log(`Service Worker: Fetching ${event.request.url}`);
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Zwraca zasób z cache, jeśli jest dostępny, inaczej pobiera z sieci
        if (response) {
          console.log('Zwracanie zasobu z cache:', event.request.url);
          return response;
        } else {
          console.log('Pobieranie zasobu z sieci:', event.request.url);
          return fetch(event.request)
            .then((networkResponse) => {
              // Sprawdź, czy odpowiedź jest poprawna
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    console.log('Dodawanie odpowiedzi do cache:', event.request.url);
                  });
              }
              return networkResponse;
            })
            .catch((error) => {
              console.error('Błąd pobierania zasobu:', error);
              return new Response('Brak połączenia z internetem', { status: 503 });
            });
        }
      })
      .catch((error) => {
        console.error('Błąd w obsłudze fetch:', error);
        return new Response('Błąd w pobieraniu danych', { status: 503 });
      })
  );
});

// Aktualizacja cache przy zmianach wersji
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Aktywacja');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Usuwanie starego cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .catch((error) => {
      console.error('Błąd przy aktywacji i czyszczeniu cache:', error);
    })
  );
});