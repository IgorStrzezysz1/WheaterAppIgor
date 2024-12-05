// Sprawdź, czy przeglądarka obsługuje Service Workery
if ('serviceWorker' in navigator) {
    // Zarejestruj Service Workera po załadowaniu strony
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js') // ścieżka do pliku sw.js
            .then((registration) => {
                console.log('Service Worker zarejestrowany z sukcesem:', registration);
            })
            .catch((error) => {
                console.log('Błąd rejestracji Service Workera:', error);
            });
    });
} else {
    console.log('Service Worker nie jest obsługiwany w tej przeglądarce.');
}
