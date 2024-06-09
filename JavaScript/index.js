// Function to refresh weather data on the page
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  
  let temperature = response.data.main.temp;
  let date = new Date(response.data.dt * 1000);
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  
  cityElement.innerHTML = response.data.name;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Function to format date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
      minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

// Function to search for a city and fetch its weather data
function searchCity(city) {
  let apiKey = "8742fb00593f7adfe00261eb3501404b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

// Function to handle form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input").value;
  searchCity(searchInput);
}

// Add event listener to the search form
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Show weather for Houston by default when the page loads
searchCity("Houston");
