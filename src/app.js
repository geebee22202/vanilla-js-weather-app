function formattedDate() {
	let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
	let day = days[now.getDay()];

	let hours = now.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}

	let minutes = now.getMinutes();
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

function showTemp(response) {
	document.querySelector('#city').innerHTML = response.data.name;
	document.querySelector('#temperature').innerHTML = Math.round(response.data.main.temp);
	document.querySelector('#humidity').innerHTML = response.data.main.humidity;
	document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);

	document.querySelector('#weather-description').innerHTML = response.data.weather[0].description;
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

let searchForm = document.querySelector('#search-form');
let now = new Date();
let date = document.querySelector('#date');

let currentLocation = document.querySelector('#current-location-btn');
currentLocation.addEventListener('click', getCurrentLocation);

date.innerHTML = formattedDate(date);
searchForm.addEventListener('submit', handleSearch);
searchCity('New York');

// function convertToFahrenheit(event) {
// 	event.preventDefault();
// 	let temperatureElement = document.querySelector('#temperature');
// 	temperatureElement.innerHTML = `66`;
// }
// function convertToCelsius(event) {
// 	event.preventDefault();
// 	let temperatureElement = document.querySelector('#temperature');
// 	temperatureElement.innerHTML = 19;
// }

// function showTemp(response) {
//   let city = response.data.name;
//   let temp = Math.round(response.data.main.temp);
//   let message = `It is ${temp}°F in ${city}.`;
//   let h1 = document.querySelector("h1");
//   h1.innerHTML = message;
// }

// let fahrenheitLink = document.querySelector('#fahrenheit-link');
// fahrenheitLink.addEventListener('click', convertToFahrenheit);

// let celsiusLink = document.querySelector('#celsius-link');
// celsiusLink.addEventListener('click', convertToCelsius);
