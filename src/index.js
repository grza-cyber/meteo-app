function formatDate() {
let currentDay = new Date();   
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[currentDay.getDay()];
let currentTime = currentDay.getHours();
let minute = currentDay.getMinutes();
let currentDate = document.querySelector("#time");
if (minute < 10) {
    minute = `0${minute}`;
}
currentDate.innerHTML = `${day}, ${currentTime}:${minute}`;
}
let today = document.querySelector("#time");
today.addEventListener("load", formatDate());

function refreshMeteo(response) {


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

console.log(response.data);
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

let formElement = document.querySelector("#searchForm");
formElement.addEventListener("submit", handleSearchSubmit);

searchCity("Zürich");