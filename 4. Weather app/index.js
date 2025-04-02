const apiKey = 'API KEY'; // Replace with your OpenWeatherMap API Key
const getWeatherButton = document.getElementById('get-weather');
const cityInput = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const descriptionElement = document.getElementById('description');
const errorMessageElement = document.getElementById('error-message');

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) {
        errorMessageElement.textContent = 'Please enter a city name.';
        return;
    }

    fetchGeoLocation(city);
});

function fetchGeoLocation(city) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    
    fetch(geoUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error with response');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('City not found');
            }
            const lat = data[0].lat;
            const lon = data[0].lon;
            fetchWeatherData(lat, lon);
        })
        .catch(error => {
            errorMessageElement.textContent = `Error: ${error.message}`;
            clearWeatherData();
        });
}

function fetchWeatherData(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            errorMessageElement.textContent = `Error: ${error.message}`;
            clearWeatherData();
        });
}

function displayWeatherData(data) {
    const temperature = data.current.temp;
    const humidity = data.current.humidity;
    const description = data.current.weather[0].description;

    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    descriptionElement.textContent = `Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}`;

    errorMessageElement.textContent = ''; 
}

function clearWeatherData() {
    temperatureElement.textContent = '';
    humidityElement.textContent = '';
    descriptionElement.textContent = '';
}
