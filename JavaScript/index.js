document.querySelector("#search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
});

function searchCity(city) {
  let apiKey = "8742fb00593f7adfe00261eb3501404b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity strong").innerHTML = response.data.main.humidity + "%";
  document.querySelector("#wind strong").innerHTML = response.data.wind.speed + " km/h";
  document.querySelector(".current-temperature-icon").innerHTML = getWeatherIcon(response.data.weather[0].icon);
  document.querySelector("#current-date").innerHTML = formatDate(new Date());
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
    "50n": "🌫",
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
