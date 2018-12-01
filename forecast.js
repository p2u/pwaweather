"use strict";
const main = document.querySelector('main');
const appKey = "b554424da5715ae40ee25d7ac9c307bf";
const requestOpt = "&units=metric&lang=cz";
const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const imgUrl = "https://openweathermap.org/img/w/";
const userCityId = "userCityId";
const cityId = getValue(userCityId);
var weather;

window.addEventListener("load", async e => {
	await fetchWeather();
	main.innerHTML = `Místo: ${weather.city.name} <br>`;
	for (let i = 0; i < weather.list.length; i++) {
		main.innerHTML += printWeather(weather.list[i]);
	}
	initGui();
});

function getValue(name) {
	return window.localStorage.getItem(name);
}

function setValue(name, value) {
	window.localStorage.setItem(name, value);
}

async function fetchWeather() {
	const weatherJson = await fetch(`${weatherUrl}forecast?id=${cityId}&appid=${appKey}${requestOpt}`);
	weather = await weatherJson.json();
};

function printWeather(weather) {
	return `
		${weather.dt_txt} UTC <br>
		Teplota: ${weather.main.temp} °C <br>
		Počasí: ${weather.weather[0].description} <br>
		Nejnižší teplota: ${weather.main.temp_min} °C <br>
		Nejvyšší teplota: ${weather.main.temp_max} °C <br>
		Vlhkost: ${weather.main.humidity} % <br>
		Atmosférický tlak: ${weather.main.pressure} hPa <br>
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
	  routes: [
		    {
		      path: '/about/',
		      url: 'about.html',
		    },
		  ],
          // ... other parameters
        });

        var mainView = theweather.views.create('.view-main');
}

