// Zdefiniuj swój klucz API
const apiKey = '83a4e536c6cc9f7b61410fa93df99220'; 

// Zdefiniuj elementy, w których wyświetlisz dane pogodowe
const cityElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const forecastElement = document.getElementById('forecast');
const weatherIconElement = document.getElementById('weather-icon');

// Zdefiniuj pole tekstowe i przycisk
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');

// Funkcja do pobierania danych pogodowych na podstawie nazwy miasta
async function fetchWeatherDataByCity(cityName) {
  try {
    // Wysyłamy zapytanie do API, używając nazwy miasta
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pl`);


    // Jeśli odpowiedź API jest błędna, zgłaszamy błąd
    if (!response.ok) {
      throw new Error(`Błąd API: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    
    // Zaloguj pełną odpowiedź z API, aby sprawdzić, co jest zwracane
    console.log(data);

    // Sprawdzamy kod odpowiedzi z API
    if (data.cod === 200) {
      cityElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      forecastElement.textContent = data.weather[0].description;
      weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } else {
      alert('Nie udało się pobrać danych pogodowych.');
    }
  } catch (error) {
    console.error('Błąd podczas pobierania danych pogodowych:', error);
    alert(`Wystąpił błąd podczas pobierania danych pogodowych: ${error.message}`);
  }
}

// Funkcja obsługująca kliknięcie przycisku
searchBtn.addEventListener('click', () => {
  const cityName = locationInput.value.trim();
  
  // Sprawdzamy, czy użytkownik wpisał nazwę miasta
  if (cityName !== '') {
    fetchWeatherDataByCity(cityName);
  } else {
    alert('Proszę wpisać nazwę miasta');
  }
});

// Opcjonalnie: Możesz dodać możliwość wciśnięcia "Enter", aby wyszukać pogodę
locationInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const cityName = locationInput.value.trim();
    if (cityName !== '') {
      fetchWeatherDataByCity(cityName);
    }
  }
});
