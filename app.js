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
  let day1 = date1.getDay();
  let days1 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days1[day1];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);

  function displayForecast(response) {
    let forecast = response.data.daily;
    console.log(response.data);

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 5) {
        forecastHTML =
          forecastHTML +
          `
    <div class="col" id="col">
     <div class ="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
     <img src= "https://openweathermap.org/img/wn/${
       forecastDay.weather[0].icon
     }@2x.png"
     alt=""
     width= "35" />
     <div class= "weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}° </span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
      </div>
    </div>
  `;
      }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
}

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
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  fahrenheitTemp = response.data.main.temp;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecast(response.data.coord);
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
