// weatherModule.js

const apiKey = '27d3ecbd4145adf6459bc176d822c3d3'; // Replace with your actual OpenWeatherMap API key
const baseUrl = 'https://api.openweathermap.org/data/2.5';
const lat = 0.3476;  // Latitude of Kampala
const lon = 32.5825; // Longitude of Kampala

/**
 * Fetch weather data (current and forecast)
 */
async function fetchWeatherData() {
    try {
        const currentWeather = await fetchData(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const weatherForecast = await fetchData(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

        updateWeatherUI(currentWeather);
        updateForecastUI(weatherForecast.list);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

/**
 * Fetch data from the specified URL
 * @param {string} url - The URL to fetch data from
 * @returns {Promise<object>} - The fetched data
 */
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
}

/**
 * Convert UNIX timestamp to human-readable time
 * @param {number} timestamp - UNIX timestamp
 * @returns {string} - Formatted time (HH:MM AM/PM)
 */
function convertUnixToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
}

/**
 * Convert UNIX timestamp to human-readable date (day of the week)
 * @param {number} timestamp - UNIX timestamp
 * @returns {string} - Formatted date (e.g., "Monday, Oct 7")
 */
function convertUnixToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

/**
 * Update the current weather UI
 * @param {object} data 
 */
function updateWeatherUI(data) {
    const weatherDiv = document.querySelector('.weather div.weather-details');
    const { temp, temp_min, temp_max, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;
    const { sunrise, sunset } = data.sys;

    weatherDiv.innerHTML = `
        <div class="weather-data">
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Condition:</strong> ${description}</p>
            <p><strong>Wind Speed:</strong> ${speed} m/s</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Sunrise:</strong> ${convertUnixToTime(sunrise)}</p>
            <p><strong>Sunset:</strong> ${convertUnixToTime(sunset)}</p>
        </div>
    `;
}

/**
 * Update the weather forecast section with daily temperatures for 3 days
 * @param {Array} forecastData - Array containing weather forecast data
 */
function updateForecastUI(forecastData) {
    const forecastDiv = document.querySelector('.forecast div');
    forecastDiv.innerHTML = '';

    const dailyTemperatures = {};

    forecastData.forEach((entry) => {
        const { dt, main, weather } = entry;
        const dayOfWeek = convertUnixToDate(dt);

        if (!dailyTemperatures[dayOfWeek]) {
            dailyTemperatures[dayOfWeek] = {
                maxTemp: main.temp_max,
                minTemp: main.temp_min,
                icon: weather[0].icon,
            };
        } else {
            dailyTemperatures[dayOfWeek].maxTemp = Math.max(dailyTemperatures[dayOfWeek].maxTemp, main.temp_max);
            dailyTemperatures[dayOfWeek].minTemp = Math.min(dailyTemperatures[dayOfWeek].minTemp, main.temp_min);
        }
    });

    const days = Object.keys(dailyTemperatures).slice(0, 3);

    days.forEach(day => {
        const { maxTemp, minTemp, icon } = dailyTemperatures[day];
        const forecastItem = `
            <div class="forecast-item">
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${day} weather icon">

                <div>
                <p><strong>${day}</strong></p>
                <p><strong>Max Temp:</strong> ${maxTemp}°C</p>
                <p><strong>Min Temp:</strong> ${minTemp}°C</p>                
                </div>

            </div>
        `;
        forecastDiv.innerHTML += forecastItem;
    });
}

// Fetch weather data for Kampala
fetchWeatherData();
