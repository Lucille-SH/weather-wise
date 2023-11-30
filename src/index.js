function updateWeatherData(response) {
  let mainDegrees = document.querySelector("#main-weather-degrees");
  let mainCity = document.querySelector("#main-city");
  let humidityElement = document.querySelector("#humidity-percent");
  let windElement = document.querySelector("#wind-kms");
  let conditionElement = document.querySelector("#current-condition");
  let dayTimeElement = document.querySelector("#current-day-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#main-weather-icon");

  mainCity.innerHTML = response.data.city;
  mainDegrees.innerHTML = Math.round(response.data.temperature.current);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  conditionElement.innerHTML = response.data.condition.description;
  dayTimeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="main-weather-icon">`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function refreshWeather(city) {
  let apiKey = "66b4t441aodafc3797bfd80f9495a36b";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(updateWeatherData);
}

function handleCityClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");

  refreshWeather(cityInput.value);
}

function getForecast(city) {
  apiKey = "66b4t441aodafc3797bfd80f9495a36b";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class = "weather-forecast-day">
      <div class="day">${formatDay(day.time)}</div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon" id="weather-forecast-icon"
            <div class="weather-temperatures">
              <span class="weather-temperatures-high">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="weather-temperatures-low">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
            </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let changeCity = document.querySelector("#city-submit");
changeCity.addEventListener("click", handleCityClick);

refreshWeather("Dublin");
