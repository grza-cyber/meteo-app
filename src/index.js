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
currentDate.innerHTML = `${day}, ${currentTime}:${minute}`;
}
let today = document.querySelector("#time");
today.addEventListener("load", formatDate());

function currentTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
let currentTemperature = Math.round(response.data.temperature.current);
temperatureElement.innerHTML = currentTemperature;
let headerContent = document.querySelector("#city");
headerContent.innerHTML = response.data.city;
}

function displayCity(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-city");
    let city = searchInputElement.value;
    
    let apiKey = "4a76f73ec0tb4cf9o9b3b1c325220356";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(currentTemperature);
}
let formElement = document.querySelector("#searchForm");
formElement.addEventListener("submit", displayCity);