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
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=imperial`;

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

	getForecast(response.data.coord);
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
function formatDailyForecast(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

	return days[day];
}
function displayForecast(response) {
	let dailyForecast = response.data.daily;
	let forecastElement = document.querySelector('#forecast');
	forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecast, index) {
    if (index < 6) {
      forecastHTML =
			forecastHTML +
			` <div class="col-2">
          <div class="weather-forecast-date">
              ${formatDailyForecast(forecast.dt)}
          </div>
          <img 
          src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
          alt="cloud" 
          width="45px">
          <div class="weather-forecast-temp">
            <span class="forecast-temp-max">${Math.round(forecast.temp.max)}</span><span class="forecast-temp-min">
              ${Math.round(forecast.temp.min)}
            </span>
          </div>
        </div>`;
    }
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector('#search-form');

let currentLocation = document.querySelector('#current-location-btn');
currentLocation.addEventListener('click', getCurrentLocation);

searchForm.addEventListener('submit', handleSearch);



searchCity('New York');
