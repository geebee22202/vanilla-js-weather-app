function formattedDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
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

function findTemp(city) {
  let cityName = document.querySelector("#city-input").value;
  let unit = "imperial";
  let apiKey = "935a08ec240b922ff7c41b1be851c24f";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndpoint}${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  findTemp(cityInput);
}

function showTemp(response) {
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
}


let searchForm = document.querySelector("#search-form");
let now = new Date();
let date = document.querySelector("#date");

date.innerHTML = formattedDate(date);
searchForm.addEventListener("submit", search);


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
