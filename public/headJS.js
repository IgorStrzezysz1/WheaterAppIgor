const cityElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const forecastElement = document.getElementById('forecast');
const weatherIconElement = document.getElementById('weather-icon');

const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');

async function fetchWeatherDataByCity(cityName) {
    try {
        const response = await fetch(`http://localhost:3000/weather?city=${cityName}`);
        if (!response.ok) {
            throw new Error(`Błąd API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        cityElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        forecastElement.textContent = data.weather[0].description;
        weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
        console.error('Błąd podczas pobierania danych pogodowych:', error);
        alert(`Wystąpił błąd podczas pobierania danych pogodowych: ${error.message}`);
    }
}

searchBtn.addEventListener('click', () => {
    const cityName = locationInput.value.trim();
    if (cityName !== '') {
        fetchWeatherDataByCity(cityName);
    } else {
        alert('Proszę wpisać nazwę miasta');
    }
});

locationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const cityName = locationInput.value.trim();
        if (cityName !== '') {
            fetchWeatherDataByCity(cityName);
        }
    }
});
