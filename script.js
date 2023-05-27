function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let h3 = document.querySelector("#date");
let currentDate = new Date();
h3.innerHTML = formatDate(currentDate);

//Bonus geolocation/button
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let button = document.querySelector("#location-dot");
button.addEventListener("click", getCurrentPosition);

//Weather data
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

//Api info
function inputLocation(city) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

//Default location
inputLocation("San Antonio");

//Search Form
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;

  inputLocation(city);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchCity);
