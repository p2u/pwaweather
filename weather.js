"use strict";
const main = document.querySelector('#weatherDescription');
const appKey = "b554424da5715ae40ee25d7ac9c307bf";
const requestOpt = "&units=metric&lang=cz";
const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const imgUrl = "https://openweathermap.org/img/w/";
const userCityId = "userCityId";
const defaultCityId = "3061370";	// Zlin
var theweather;
var $$;

window.addEventListener("load", async e => {
	setValue(userCityId, getValue(userCityId) || defaultCityId);
	initGui();
});

function getValue(name) {
        return window.localStorage.getItem(name);
}

function setValue(name, value) {
        window.localStorage.setItem(name, value);
}

async function updateWeather() {
	var weather = await getActualWeather();
	printLocation(weather);
	main.innerHTML = printWeather(weather);
};

async function getActualWeather() {
	const cityId = getValue(userCityId);
	const weatherJson = await fetch(`${weatherUrl}weather?id=${cityId}&appid=${appKey}${requestOpt}`);
	return await weatherJson.json();
}

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

async function initGui() {
	theweather = new Framework7({
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
		  { path: '/chooseCity/', componentUrl: './choosecity.html'}
	  ]
	  // ... other parameters
	});
	$$ = Dom7;
	$$(document).on('page:init','.page[data-name="home"]', function() {
		updateWeather();
	});
	$$(document).on('page:reinit','.page[data-name="home"]', function() {
		updateWeather();
	});
	var mainView = theweather.views.create('.view-main');
		        const citiesJson = await fetch("./city.cs.list.json");
		        const cities = await citiesJson.json();
			const listOfCities = cities.map(city=>{return city.name});

	var autocompleteStandaloneSimple = theweather.autocomplete.create({
          openIn: 'page', //open in page
          openerEl: '#autocomplete-standalone', //link that opens autocomplete
          closeOnSelect: true, //go back after we select something
          source: function (query, render) {
            var results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Find matched items
            for (var i = 0; i < listOfCities.length; i++) {
		    let cityName = listOfCities[i];
              if (cityName.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(cityName);
            }
            // Render items by passing array with result items
            render(results);
          },
          on: {
            change: function (value) {
	      let cityId = cities.find(city=>value[0]==city.name).id;
              setValue(userCityId, cityId);
            },
          },
        });


}

