const cityElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const forecastElement = document.getElementById('forecast');
const weatherIconElement = document.getElementById('weather-icon');
const apiKey = '83a4e536c6cc9f7b61410fa93df99220'; 
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
// const newbutton = document.getElementById('Newbutton')
// const clickAlertButton =()=>{
//         alert("Nowy Button")
// }
async function fetchWeatherDataByCity(cityName) { 
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pl`);
        if (!response.ok) {
            throw new Error(`Błąd API: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);

        cityElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`; //zaokrągla round i interpolacja
        forecastElement.textContent = data.weather[0].description; // tablica i odwołuje się do 1 elementu tablicy a potem deskricpin
        weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        locationInput.value="" //kasowanie imputa
    } catch (error) {
        console.error('Błąd podczas pobierania danych pogodowych:', error);
        alert(`Wystąpił błąd podczas pobierania danych pogodowych: ${error.message}`);
    }
}

searchBtn.addEventListener('click', () => {
    const cityName = locationInput.value.trim(); //trim usuwa białe znaki
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

// console.log(newbutton)
// newbutton.addEventListener('click', clickAlertButton);