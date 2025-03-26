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
function weatherInfo() {
    
}
let today = document.querySelector("#time");
today.addEventListener("load", formatDate());
