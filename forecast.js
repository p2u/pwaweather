"use strict";
const main = document.querySelector('#page-content');
const appKey = "b554424da5715ae40ee25d7ac9c307bf";
const requestOpt = "&units=metric&lang=cz";
const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const imgUrl = "https://openweathermap.org/img/w/";
const userCityId = "userCityId";
const cityId = getValue(userCityId);
var weather;

window.addEventListener("load", async e => {
	await fetchWeather();
	main.innerHTML = `<div class="card"><div class="card-header">${weather.city.name} </div> </div>`;
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
		<div class="data-table card" >
			<div class="card-header">
		${weather.dt_txt} UTC
			</div>
			<div class="card-content">
				<table>
					<tbody id="weatherDescription">
		<tr>
		<td>Teplota:</td><td> ${weather.main.temp} °C </td>
		</tr><tr>
		<td>Počasí:</td><td> ${weather.weather[0].description} </td>
		</tr><tr>
		<td>Nejnižší teplota:</td><td> ${weather.main.temp_min} °C </td>
		</tr><tr>
		<td>Nejvyšší teplota:</td><td> ${weather.main.temp_max} °C </td>
		</tr><tr>
		<td>Vlhkost:</td><td> ${weather.main.humidity} % </td>
		</tr><tr>
		<td>Atmosférický tlak:</td><td> ${weather.main.pressure} hPa </td>
		</tr><tr>
		<td colspan="2"><img src="${imgUrl}${weather.weather[0].icon}.png" alt="${weather.weather[0].description}" width="100" height="100"> </td>
		</tr>
					</tbody>
				</table>
			</div>
		</div>
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

