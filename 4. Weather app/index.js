const apiKey = 'xxx'; // DUMMY geocode apikey
const getWeatherButton = document.getElementById('get-weather');
const cityInput = document.getElementById('city');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const descriptionElement = document.getElementById('description');
const errorMessageElement = document.getElementById('error-message');

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) {
        clearWeatherData();
        errorMessageElement.textContent = 'Please enter a city name.';
        return;
    }

    fetchGeoLocation(city);
});

function fetchGeoLocation(city) {
    const geoUrl = `https://geocode.maps.co/search?q=${city}&api_key=${apiKey}`;
    
    fetch(geoUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error with response');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                clearWeatherData();
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
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;

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
    const temperature = data.current.temperature_2m;
    const humidity = data.current.relative_humidity_2m;


    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    humidityElement.textContent = `Humidity: ${humidity}%`;

    errorMessageElement.textContent = ''; 
}

function clearWeatherData() {
    temperatureElement.textContent = '';
    humidityElement.textContent = '';
}
