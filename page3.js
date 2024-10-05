const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=59.91,40.71,55.68,59.43,51.50&longitude=10.74,-74.00,12.57,24.74,-0.12&current=temperature_2m,apparent_temperature,rain,wind_speed_10m";

function fetchWeatherData() {
    fetch(weatherApiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((weatherData) => {
            displayWeatherData(weatherData);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

function displayWeatherData(data) {
    const locations = ["Oslo", "New York", "København", "Tallinn", "London"];
    const container = document.getElementById("weather-container");
    container.innerHTML = "";


    data.forEach((weatherInfo, index) => {
        const location = locations[index];
        const article = document.createElement("article");


        const title = document.createElement("h2");
        title.textContent = location;


        const temperature = document.createElement("p");
        temperature.textContent = `Temperature: ${weatherInfo.current.temperature_2m}°C`;

        const apparentTemperature = document.createElement("p");
        apparentTemperature.textContent = `Feels Like: ${weatherInfo.current.apparent_temperature}°C`;

        const rain = document.createElement("p");
        rain.textContent = `Rain: ${weatherInfo.current.rain} mm`;

        const windSpeed = document.createElement("p");
        windSpeed.textContent = `Wind Speed: ${weatherInfo.current.wind_speed_10m} km/h`;


        article.appendChild(title);
        article.appendChild(temperature);
        article.appendChild(apparentTemperature);
        article.appendChild(rain);
        article.appendChild(windSpeed);


        container.appendChild(article);
    });
}

function refreshWeatherData() {
    fetchWeatherData();
    setInterval(fetchWeatherData, 600000);
}

document.addEventListener("DOMContentLoaded", () => {
    refreshWeatherData();
});
