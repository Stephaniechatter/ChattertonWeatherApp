function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = 'fdf828f4de846385fac2a174f46c4889';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureIconElement = document.querySelector("#temperature-icon");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  temperatureIconElement.innerHTML = getWeatherIcon(response.data.weather[0].icon);
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
}

function getWeatherIcon(iconCode) {
  const iconMap = {
      "01d": "☀️",
      "01n": "🌕",
      "02d": "🌤",
      "02n": "🌥",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧",
      "09n": "🌧",
      "10d": "🌦",
      "10n": "🌦",
      "11d": "⛈",
      "11n": "⛈",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫",
      "50n": "🌫"
  };
  return iconMap[iconCode] || "❓";
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  if (hours < 10) {
      hours = `0${hours}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
