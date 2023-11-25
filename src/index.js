function updateWeatherData(response) {
  console.log(response.data.temperature.current);

  let mainDegrees = document.querySelector("#main-weather-degrees");
  let temperature = response.data.temperature.current;
  mainDegrees.innerHTML = Math.round(temperature);

  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = response.data.city;
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

let changeCity = document.querySelector("#city-submit");
changeCity.addEventListener("click", handleCityClick);

refreshWeather("Dublin");
