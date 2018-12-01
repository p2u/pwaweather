"use strict";
const main = document.querySelector('main');
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
	main.innerHTML = printWeather(weather);
};

function printWeather(weather) {
	return `
		Místo: ${weather.name} <br>
		Severní šířka: ${weather.coord.lat} <br>
		Východní délka: ${weather.coord.lon} <br>
		Aktuální teplota: ${weather.main.temp} °C <br>
		Aktuální počasí: ${weather.weather[0].description} <br>
		Nejnižší teplota: ${weather.main.temp_min} °C <br>
		Nejvyšší teplota: ${weather.main.temp_max} °C <br>
		Atmosférický tlak: ${weather.main.pressure} hPa <br>
		Vlhkost: ${weather.main.humidity} % <br>
		<img src="${imgUrl}${weather.weather[0].icon}.png" alt="${weather.weather[0].description}" width="100" height="100"> <br>
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

