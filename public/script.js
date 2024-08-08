let weatherInterval;

document.getElementById('fetchWeather').addEventListener('click', () => {
    fetchWeather();
    // Set the interval only if it's not already set
    if (!weatherInterval) {
        weatherInterval = setInterval(fetchWeather, 1 * 60 * 1000); // Fetch weather every 1 minutes
    }
});

document.getElementById('stopFetching').addEventListener('click', () => {
    if (weatherInterval) {
        clearInterval(weatherInterval);
        weatherInterval = null; // Reset the interval ID
        document.getElementById('weatherInfo').innerHTML += '<p>Fetching stopped.</p>';
    }
});

async function fetchWeather() {
    try {
        const response = await fetch('/weather');
        const data = await response.json();
        const weatherInfo = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
        document.getElementById('weatherInfo').innerHTML = weatherInfo;
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = '<p>Unable to fetch weather data.</p>';
    }
}
