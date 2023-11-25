function handleCityClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let updateCity = cityInput.value;
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = updateCity;
}

let changeCity = document.querySelector("#city-submit");
changeCity.addEventListener("click", handleCityClick);
console.log(changeCity);
