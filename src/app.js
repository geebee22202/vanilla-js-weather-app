function formattedDate(timestamp) {
	let date = new Date(timestamp);
	let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
	let day = days[date.getDay()];

	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}

	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
	let unit = 'imperial';
	let apiKey = '935a08ec240b922ff7c41b1be851c24f';
	let apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?q=';
	let apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${unit}`;
	axios.get(apiUrl).then(showTemp);
}

function handleSearch(event) {
	event.preventDefault();
	let city = document.querySelector('#city-input').value;
	searchCity(city);
}
function getForecast(coordinates) {
  let apiKey = '935a08ec240b922ff7c41b1be851c24f';
  let apiUrl =
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
	fahrenheitTemp = response.data.main.temp;
	document.querySelector('#temperature').innerHTML = Math.round(fahrenheitTemp);
	document.querySelector('#city').innerHTML = response.data.name;
	document.querySelector('#humidity').innerHTML = response.data.main.humidity;
	document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
	document.querySelector('#weather-description').innerHTML = response.data.weather[0].description;
	document.querySelector('#date').innerHTML = formattedDate(response.data.dt * 1000);
	document
		.querySelector('#weather-icon')
		.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
	document
		.querySelector('#weather-icon')
    .setAttribute('alt', `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);
  
  getForecast(response.data.coord)
}
function showCurrentLocation(position) {
	let apiKey = '935a08ec240b922ff7c41b1be851c24f';
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
	axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function convertToFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector('#temperature');
	temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function convertToCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector('#temperature');
	let celsius = (fahrenheitTemp - 32) * 5 / 9;
	temperatureElement.innerHTML = Math.round(celsius);
}
function displayForecast(response) {
	let forecastElement = document.querySelector('#forecast');
	let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	forecastHTML = `<div class="row">`;
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			` <div class="col-2">
          <div class="weather-forecast-date">
              ${day}
          </div>
          <img 
          src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png" 
          alt="cloud" 
          width="45px">
          <div class="weather-forecast-temp">
            <span class="forecast-temp-max">18°</span><span class="forecast-temp-min">
              12°
            </span>
          </div>
        </div>`;
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector('#search-form');

let currentLocation = document.querySelector('#current-location-btn');
currentLocation.addEventListener('click', getCurrentLocation);

searchForm.addEventListener('submit', handleSearch);

let fahrenheitTemp = null;

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', convertToFahrenheit);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', convertToCelsius);

searchCity('New York');

