"use strict";
const main = document.querySelector('#weatherDescription');
const citySelector = document.querySelector('#citySelector');
const appKey = "b554424da5715ae40ee25d7ac9c307bf";
const requestOpt = "&units=metric&lang=cz";
const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const imgUrl = "https://openweathermap.org/img/w/";
const userCityId = "userCityId";
const defaultCityId = "3061370";	// Zlin
var weather;

window.addEventListener("load", async e => {
	await updateCitySelector();
	setValue(userCityId, getValue(userCityId) || defaultCityId);
	citySelector.value = getValue(userCityId);
	citySelector.addEventListener("change", e => {
		let cityId = e.target.value;
		setValue(userCityId, cityId);
		updateWeather();
	});
	updateWeather();
	initGui();
});

function getValue(name) {
        return window.localStorage.getItem(name);
}

function setValue(name, value) {
        window.localStorage.setItem(name, value);
}

async function updateCitySelector() {
	const citiesJson = await fetch("./city.cs.list.json");
	const cities = await citiesJson.json();

	citySelector.innerHTML = cities.map(
		src => `<option value="${src.id}">${src.name}</options>`
		).join('\n');
};

async function updateWeather() {
	const cityId = getValue(userCityId);
	const weatherJson = await fetch(`${weatherUrl}weather?id=${cityId}&appid=${appKey}${requestOpt}`);
	weather = await weatherJson.json();
	printLocation(weather);
	main.innerHTML = printWeather(weather);
};

function printLocation(weather) {
	const location = document.querySelector('#location');
	location.innerHTML = `${weather.name}`;
}

function printWeather(weather) {
	return `
	<tr>
		<td>Severní šířka:</td><td> ${weather.coord.lat} </td>
	</tr><tr>
		<td>Východní délka:</td><td> ${weather.coord.lon} </td>
	</tr><tr>
		<td>Aktuální teplota:</td><td> ${weather.main.temp} °C </td>
	</tr><tr>
		<td>Aktuální počasí:</td><td> ${weather.weather[0].description} </td>
	</tr><tr>
		<td>Nejnižší teplota:</td><td> ${weather.main.temp_min} °C </td>
	</tr><tr>
		<td>Nejvyšší teplota:</td><td> ${weather.main.temp_max} °C </td>
	</tr><tr>
		<td>Atmosférický tlak:</td><td> ${weather.main.pressure} hPa </td>
	</tr><tr>
		<td>Vlhkost:</td><td> ${weather.main.humidity} % </td>
	</tr><tr>
		<td colspan="2"> <img src="${imgUrl}${weather.weather[0].icon}.png" alt="${weather.weather[0].description}" width="100" height="100"> </td>
	</tr>
		`;
};

function initGui() {
	var theweather = new Framework7({
	  // App root element
	  root: '#app',
	  // App Name
	  name: 'TheWeather',
	  // App id
	  id: 'com.github.p2u.pwaweather',
	  // Enable swipe panel
	  panel: {
	    swipe: 'left',
	  },
	  // Add default routes
	  // ... other parameters
	});

	var mainView = theweather.views.create('.view-main');
}

