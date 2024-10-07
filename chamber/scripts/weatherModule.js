// weatherModule.js

const apiKey = '27d3ecbd4145adf6459bc176d822c3d3'; // Replace with your actual OpenWeatherMap API key
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall';

/**
 * Fetch weather data for Kampala, Uganda
 */
async function fetchWeatherData() {
    const lat = 0.3476;
    const lon = 32.5825;
    const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

/**
 * Convert UNIX timestamp to human-readable time
 * @param {number} timestamp - UNIX timestamp
 * @returns {string} - Formatted time (HH:MM AM/PM)
 */
function convertUnixToTime(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert to milliseconds
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`.slice(-2); // Ensure two digits for minutes
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${ampm}`;
}

/**
 * Convert UNIX timestamp to human-readable date (day of the week)
 * @param {number} timestamp - UNIX timestamp
 * @returns {string} - Formatted date (e.g., "Monday, Oct 7")
 */
function convertUnixToDate(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options); // Format date
}

/**
 * Update the current weather and forecast sections with fetched weather data
 * @param {object} data - Weather data from OpenWeatherMap API
 */
function updateWeatherUI(data) {
    const weatherDiv = document.querySelector('.weather div.weather-details');
    const forecastDiv = document.querySelector('.forecast div');

    const { temp, temp_min, temp_max, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;
    const { sunrise, sunset } = data.sys; // Get sunrise and sunset from the data

    // Convert UNIX timestamps to readable times
    const sunriseTime = convertUnixToTime(sunrise);
    const sunsetTime = convertUnixToTime(sunset);

    // Update Current Weather Section
    weatherDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Wind Speed:</strong> ${speed} m/s</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Sunrise:</strong> ${sunriseTime}</p>
        <p><strong>Sunset:</strong> ${sunsetTime}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
    `;

    // Update Forecast Section with current day's Max and Min Temp
    forecastDiv.innerHTML = `
        <p><strong>Max Temp:</strong> ${temp_max}°C</p>
        <p><strong>Min Temp:</strong> ${temp_min}°C</p>
    `;
}

// Fetch weather data for Kampala
fetchWeatherData();

/**
 * Fetch weather forecast data for the next 3 days
 */
async function fetchWeatherForecast() {
    const lat = 0.3476;  // Latitude of Kampala
    const lon = 32.5825; // Longitude of Kampala
    const url = `${forecastUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather forecast data');
        }
        const data = await response.json();
        updateForecastUI(data.daily.slice(0, 3)); // Get the first 3 days of the forecast
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}

/**
 * Update the weather forecast section with the 3-day forecast
 * @param {Array} forecastData - Array containing 3-day weather forecast data
 */
function updateForecastUI(forecastData) {
    const forecastDiv = document.querySelector('.forecast div');

    // Clear any existing content
    forecastDiv.innerHTML = '';

    // Iterate through the forecast data for the next 3 days
    forecastData.forEach(day => {
        const { temp, weather } = day;
        const { description, icon } = weather[0];

        // Convert the day timestamp to a readable day of the week
        const dayOfWeek = convertUnixToDate(day.dt);

        // Create forecast item HTML
        const forecastItem = `
            <div class="forecast-item">
                <p><strong>${dayOfWeek}</strong></p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                <p>${description}</p>
                <p><strong>Max Temp:</strong> ${temp.max}°C</p>
                <p><strong>Min Temp:</strong> ${temp.min}°C</p>
                <p><strong>Feels Like:</strong> ${temp.day}°C</p> <!-- Added temp in Celsius -->
            </div>
        `;

        // Append each forecast item to the forecast section
        forecastDiv.innerHTML += forecastItem;
    });
}

// Fetch 3-day weather forecast for Kampala
fetchWeatherForecast();
