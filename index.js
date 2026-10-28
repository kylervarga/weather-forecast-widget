const forecast = document.getElementById("forecast")
const loadingMessage = document.getElementById("status")
const tempToggle = document.getElementById("tempToggle")
const currentWeatherContent = document.getElementById("currentWeatherContent");
const hourlyForecast = document.getElementById("hourlyForecast");

let isCelsius = true;
let currentWeatherData;
let hourlyWeatherData = [];
const weatherURL =  "https://api.weatherapi.com/v1/forecast.json?key=5cd2062afeb94a1b91500232262110&q=Calgary&days=3";

//create sample weather data

let weatherData = [
    { day: "Monday", condition:"Sunny", temp_c: 18 },
    { day: "Tuesday", condition:"Cloudy", temp_c: 15 },
    { day: "Wednesday", condition:"Rainy", temp_c: 12 },
    { day: "Thursday", condition:"Sunny", temp_c: 20 },
    { day: "Friday", condition:"Cloudy", temp_c: 16 },
    { day: "Saturday", condition:"Rainy", temp_c: 10 },
    { day: "Sunday", condition:"Sunny", temp_c: 19 },
];
function convertTemperature(celsius) {
    if (isCelsius) {
        return `${celsius}°C`;
    } else {
        const fahrenheit = (celsius * 9 / 5) + 32;
        return `${Math.round(fahrenheit)}°F`;
    }
}

function displayCurrentWeather(data) {
    const current = data.current;

    const temperature = convertTemperature(current.temp_c);
    const condition = current.condition.text;
    const icon = current.condition.icon;
    const feelsLike = convertTemperature(current.feelslike_c);
    const humidity = current.humidity;
    const windSpeed = current.wind_kph;

    currentWeatherContent.innerHTML = `
        <img
            src="https:${icon}"
            alt="${condition}"
            class="w-28 h-28 mx-auto"
        >

        <p class="text-5xl font-bold mb-3">
            ${temperature}
        </p>

        <p class="text-xl">
            ${condition}
        </p>
    
    <div class="grid grid-cols-3 gap-2 sm:gap-4 mt-8">

    <div class="bg-white/10 rounded-2xl p-4">
        <p class="text-sm text-white/70 mb-2">Feels Like</p>
        <p class="text-2xl font-bold">${feelsLike}</p>
    </div>

    <div class="bg-white/10 rounded-2xl p-4">
        <p class="text-sm text-white/70 mb-2">Humidity</p>
        <p class="text-2xl font-bold">${humidity}%</p>
    </div>

    <div class="bg-white/10 rounded-2xl p-4">
        <p class="text-sm text-white/70 mb-2">Wind Speed</p>
        <p class="text-2xl font-bold">${windSpeed} km/h</p>
    </div>
</div>
`;
}

function createWeatherCard(weather) {
    return `
        <article class="bg-white/15 backdrop-blur-lg border border-white/30 p-5 md:p-8 rounded-3xl shadow-xl text-center text-white hover:bg-white/25 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <h3 class="text-xl font-bold mb-3">
                ${weather.day}
            </h3>

            <img
            src="https:${weather.icon}"
            alt="${weather.condition}"
            class="w-24 h-24 mx-auto mb-4">

            <p class="text-lg mb-3">
                ${weather.condition}
            </p>

            <p class="text-4xl font-bold text-white">
            ${convertTemperature(weather.temp_c)}
            </p>
        </article>
    `;
}
function createHourlyCard(hour) {

    return `
        <article class="bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl p-5 text-center text-white shadow-lg min-w-32 flex-shrink-0">

            <h3 class="text-lg font-bold mb-3">
                ${hour.time}
            </h3>

            <img
                src="https:${hour.icon}"
                alt="${hour.condition}"
                class="w-16 h-16 mx-auto mb-3"
            >

            <p class="text-2xl font-bold mb-2">
                ${convertTemperature(hour.temp_c)}
            </p>

            <p class="text-sm">
                ${hour.condition}
            </p>

        </article>
    `;
}

function renderWeather(weatherData) {
    forecast.innerHTML = "";

    weatherData.forEach((weather) => {
        const card = createWeatherCard(weather);

        forecast.insertAdjacentHTML("beforeend", card);
    });

    loadingMessage.textContent = "";
}

function renderHourlyWeather(hourlyData) {

    hourlyForecast.innerHTML = "";

    hourlyData.forEach((hour) => {

        const card = createHourlyCard(hour);

        hourlyForecast.insertAdjacentHTML("beforeend", card);

    });
}

renderWeather(weatherData);


tempToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;

    tempToggle.textContent = isCelsius
        ? "Switch to °F"
        : "Switch to °C";

    renderWeather(weatherData);

    renderHourlyWeather(hourlyWeatherData);

    if (currentWeatherData) {
    displayCurrentWeather(currentWeatherData);
}
});



async function fetchWeather() {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        console.log(data);

        return data;

    } catch (error) {
        console.error("Error fetching weather:", error.message);
        throw error;
    }
}

function formatWeatherData(data) {
    const forecastDays = data.forecast.forecastday;

    const formattedData = forecastDays.map((day) => {
        const date = new Date(day.date + "T12:00:00");

        const dayName = date.toLocaleDateString("en-CA", {
            weekday: "long"
        });

        return {
            day: dayName,
            condition: day.day.condition.text,
            temp_c: day.day.avgtemp_c,
            icon: day.day.condition.icon
        };
        });

        return formattedData;
    }

    function formatHourlyData(data) {

    const hourlyData = data.forecast.forecastday[0].hour;

    const formattedHours = hourlyData.map((hour) => {

        const time = hour.time.split(" ")[1];

        return {
            time: time,
            condition: hour.condition.text,
            temp_c: hour.temp_c,
            icon: hour.condition.icon
        };

    });

    return formattedHours;
}

async function loadWeather() {
    try {
        const data = await fetchWeather();
        
        currentWeatherData = data;

        displayCurrentWeather(data);

        const formattedData = formatWeatherData(data);

        weatherData = formattedData;

        renderWeather(weatherData);

        hourlyWeatherData = formatHourlyData(data);

        renderHourlyWeather(hourlyWeatherData);

    } catch (error) {
        loadingMessage.textContent = "Unable to load wather data.";
        console.error(error);
    }
}

loadWeather ();
