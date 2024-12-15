const cityElement = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const forecastElement = document.getElementById('forecast');
const weatherIconElement = document.getElementById('weather-icon');
const apiKey = '83a4e536c6cc9f7b61410fa93df99220'; 
const locationInput = document.getElementById('location-input');
const checkWheater=document.querySelector('.checkWheater')
const wheaterDetails = document.querySelector('.wheaterDetails')
const weatherInfo = document.querySelector('.weatherInfo')
const searchBar = document.querySelector('.searchBar')
const searchBtn = document.querySelector('.searchBtn')
const WheaterMoreDetails=document.querySelector('.WheaterMoreDetails')
const wheaterDetailsButton = document.querySelector('.wheaterDetails');
const wheaterMoreDetailsDiv = document.querySelector('.WheaterMoreDetails');

// Funkcja, która pokazuje szczegóły pogody
const showWeatherDetails = () => {
    wheaterMoreDetailsDiv.style.display = 'block'; // Ustawia widoczność diva
    wheaterDetailsButton.style.display = 'none'; // Ukrywa przycisk Szczegóły pogody
};

wheaterDetailsButton.addEventListener('click', () => {
    wheaterMoreDetailsDiv.style.display = 'block';
    wheaterDetailsButton.style.display = 'none';
});

// Nasłuchiwanie na kliknięcie przycisku
wheaterDetailsButton.addEventListener('click', showWeatherDetails);

const renderDetailsPage =()=>{
    console.log("TEST")
    checkWheater.style.display='none';
    weatherInfo.style.display='none';
    wheaterDetails.style.display='none';
    searchBtn.style.display='none';
    searchBar.style.display='none';
    weatherInfo.style.display='none';
}
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
    
        wheaterDetails.style.display='block';
    
    } catch (error) {
        console.error('Błąd podczas pobierania danych pogodowych:', error);
        alert(`Wystąpił błąd podczas pobierania danych pogodowych: ${error.message}`);
    }
}

wheaterDetails.addEventListener('click', renderDetailsPage)

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

document.addEventListener('DOMContentLoaded', () => {
    const WheaterMoreDetails = document.querySelector('.WheaterMoreDetails');
    WheaterMoreDetails.style.display = 'none'; // Ukryj element
});


//przygotuj to co musisz sobie Diva w html, pola wiatry, opady, + button dodaj do listy i button powortu i żeby to działało
