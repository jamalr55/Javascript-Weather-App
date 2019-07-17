// SELECT ELEMENTS
const iconElement1 = document.querySelector('.weather-icon1');
const iconElement2 = document.querySelector('.weather-icon2');
const iconElement3 = document.querySelector('.weather-icon3');
const iconElement4 = document.querySelector('.weather-icon4');
const iconElement5 = document.querySelector('.weather-icon5');

const tempElement1 = document.querySelector('.temperature-value1 p');
const tempElement2 = document.querySelector('.temperature-value2 p');
const tempElement3 = document.querySelector('.temperature-value3 p');
const tempElement4 = document.querySelector('.temperature-value4 p');
const tempElement5 = document.querySelector('.temperature-value5 p');

const descElement1 = document.querySelector('.temperature-description1 p');
const descElement2 = document.querySelector('.temperature-description2 p');
const descElement3 = document.querySelector('.temperature-description3 p');
const descElement4 = document.querySelector('.temperature-description4 p');
const descElement5 = document.querySelector('.temperature-description5 p');

const dateElement1 = document.querySelector('.date1 p');
const dateElement2 = document.querySelector('.date2 p');
const dateElement3 = document.querySelector('.date3 p');
const dateElement4 = document.querySelector('.date4 p');
const dateElement5 = document.querySelector('.date5 p');

const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

// App data
const weather = {};

weather.temperature = {
  unit: 'celsius'
};

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = '82005d27a116c2880c8f0fcb866998a0';

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      weather.temperature.value1 = Math.floor(data.list[0].main.temp - KELVIN);
      weather.temperature.value2 = Math.floor(data.list[8].main.temp - KELVIN);
      weather.temperature.value3 = Math.floor(data.list[16].main.temp - KELVIN);
      weather.temperature.value4 = Math.floor(data.list[24].main.temp - KELVIN);
      weather.temperature.value5 = Math.floor(data.list[32].main.temp - KELVIN);

      weather.description1 = data.list[0].weather[0].description;
      weather.description2 = data.list[8].weather[0].description;
      weather.description3 = data.list[16].weather[0].description;
      weather.description4 = data.list[24].weather[0].description;
      weather.description5 = data.list[32].weather[0].description;

      weather.iconId1 = data.list[0].weather[0].icon;
      weather.iconId2 = data.list[8].weather[0].icon;
      weather.iconId3 = data.list[16].weather[0].icon;
      weather.iconId4 = data.list[24].weather[0].icon;
      weather.iconId5 = data.list[32].weather[0].icon;

      weather.city = data.city.name;
      weather.country = data.city.country;

      weather.date1 = data.list[0].dt_txt.slice(0, 10);
      weather.date2 = data.list[8].dt_txt.slice(0, 10);
      weather.date3 = data.list[16].dt_txt.slice(0, 10);
      weather.date4 = data.list[24].dt_txt.slice(0, 10);
      weather.date5 = data.list[32].dt_txt.slice(0, 10);
    })
    .then(function() {
      displayWeather();
    });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
  iconElement1.innerHTML = `<img src="icons/${weather.iconId1}.png"/>`;
  iconElement2.innerHTML = `<img src="icons/${weather.iconId2}.png"/>`;
  iconElement3.innerHTML = `<img src="icons/${weather.iconId3}.png"/>`;
  iconElement4.innerHTML = `<img src="icons/${weather.iconId4}.png"/>`;
  iconElement5.innerHTML = `<img src="icons/${weather.iconId5}.png"/>`;

  tempElement1.innerHTML = `${weather.temperature.value1}°<span>C</span>`;
  tempElement2.innerHTML = `${weather.temperature.value2}°<span>C</span>`;
  tempElement3.innerHTML = `${weather.temperature.value3}°<span>C</span>`;
  tempElement4.innerHTML = `${weather.temperature.value4}°<span>C</span>`;
  tempElement5.innerHTML = `${weather.temperature.value5}°<span>C</span>`;

  descElement1.innerHTML = weather.description1;
  descElement2.innerHTML = weather.description2;
  descElement3.innerHTML = weather.description3;
  descElement4.innerHTML = weather.description4;
  descElement5.innerHTML = weather.description5;

  locationElement.innerHTML = `${weather.city}, ${weather.country}`;

  dateElement1.innerHTML = weather.date1;
  dateElement2.innerHTML = weather.date2;
  dateElement3.innerHTML = weather.date3;
  dateElement4.innerHTML = weather.date4;
  dateElement5.innerHTML = weather.date5;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement1.addEventListener('click', function() {
  if (weather.temperature.value1 === undefined) return;

  if (weather.temperature.unit == 'celsius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value1);
    fahrenheit = Math.floor(fahrenheit);

    tempElement1.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  } else {
    tempElement1.innerHTML = `${weather.temperature.value1}°<span>C</span>`;
    weather.temperature.unit = 'celsius';
  }
});
