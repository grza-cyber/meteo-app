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

function weatherInfo(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-city");
    let city = searchInputElement.value;
    let headerContent = document.querySelector("h1");
    headerContent.innerHTML = city;
}
let formElement = document.querySelector("#searchForm");
formElement.addEventListener("click", weatherInfo);