function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  let city = searchInputElement.value;
  let apiKey = 'fdf828f4de846385fac2a174f46c4889';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  iconElement.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} m/s`;
  timeElement.innerHTML = formatDate(new Date(response.data.dt * 1000));
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#time");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
