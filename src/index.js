function formatDate(date) { 
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[date.getDay()];
let hour = date.getHours();
let minute = date.getMinutes();
if (minute < 10) {
    minute = `0${minute}`;
}
return(`${day} ${hour}:${minute}`);
}


function refreshMeteo(response) {
let date = new Date(response.data.time * 1000);
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatDate(date);

let headerContent = document.querySelector("#city");
headerContent.innerHTML = response.data.city;

let descriptionElement = document.querySelector("#description");
let description = response.data.condition.description;
descriptionElement.innerHTML = `, ${description}`;

let humidityElement = document.querySelector("#humidity");
let humidity = response.data.temperature.humidity;
humidityElement.innerHTML = `${humidity}%`;    

let windElement = document.querySelector("#wind-speed");
let windSpeed = response.data.wind.speed;
windElement.innerHTML = `${windSpeed} km/h`;

let temperatureElement = document.querySelector("#temperature");
let currentTemperature = Math.round(response.data.temperature.current);
temperatureElement.innerHTML = currentTemperature;
if (currentTemperature < 10) {
    temperatureElement.innerHTML = `&nbsp;${currentTemperature}`;
}

let iconElement = document.querySelector("#icon");
let icon = response.data.condition.icon_url;
iconElement.innerHTML = `<img src="${icon}" />`;

getForecast(response.data.city);
}

function searchCity(city) {
    let apiKey = "4a76f73ec0tb4cf9o9b3b1c325220356";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshMeteo);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-city");
    searchCity(searchInputElement.value);
}

function getForecast(city) {
    let apiKey = "4a76f73ec0tb4cf9o9b3b1c325220356";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = forecastHtml + `<div class="forecast-box">
        <div class="forecast-info">
        <div class="forecast-day">${formatForecastDay(day.time)}</div>
        <div><img src="${day.condition.icon_url}" class="forecast-icon" /></div>
        <div class="forecast-temperatures">
            <div class="forecast-temperature"><strong id="temperature-max">${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="forecast-temperature" id="temperature-min"> ${Math.round(day.temperature.minimum)}°</div>
        </div>
        </div>
    </div>`;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;

}



let formElement = document.querySelector("#searchForm");
formElement.addEventListener("submit", handleSearchSubmit);

searchCity("Zürich");
