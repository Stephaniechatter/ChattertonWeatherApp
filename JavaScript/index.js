document.querySelector("#search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
});

function searchCity(city) {
  let apiKey = 'your_api_key'; // Replace with your API key
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity strong").innerHTML = response.data.main.humidity + '%';
  document.querySelector("#wind strong").innerHTML = response.data.wind.speed + ' km/h';
  document.querySelector("#current-temperature-icon").innerHTML = '☀️'; // You can update this based on the weather condition
  document.querySelector("#current-temperature-value").innerHTML = Math.round(response.data.main.temp);
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

document.querySelector("#current-date").innerHTML = formatDate(new Date());
