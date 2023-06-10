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

//Forceast
function formatDay(timestamp) {
  let date1 = new Date(timestamp * 1000);
  let day = date1.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d8o5aa0df3a2c34948fdac8abdta545d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col" id="col">
     <div class ="weather-forecast-date">${formatDay(forecastDay.time)}</div>
     <img src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
       forecastDay.condition.icon
     }.png"
     alt=""
     width= "35" />
     <div class= "weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temperature.maximum
      )}° </span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Bonus geolocation/button
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let apiKey = "d8o5aa0df3a2c34948fdac8abdta545d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=imperial`;
  console.log(position);

  axios.get(apiUrl).then(showWeather);
}

let button = document.querySelector("#location-dot");
button.addEventListener("click", getCurrentPosition);

//Weather data
function showWeather(response) {
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  document.querySelector("h1").innerHTML = response.data.city;

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );

  fahrenheitTemp = response.data.temperature.current;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecast(response.data.coordinates);
}

//Api info
function inputLocation(city) {
  let apiKey = "d8o5aa0df3a2c34948fdac8abdta545d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=imperial`;

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

//Unit conversion
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);
