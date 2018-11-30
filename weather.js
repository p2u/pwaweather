const main = document.querySelector('main');
const citySelector = document.querySelector('#citySelector');
const appKey = "b554424da5715ae40ee25d7ac9c307bf";
const defaultCityId = "3061370";	// Zlin
const requestOpt = "&units=metric&lang=cz";
const weatherUrl = "https://api.openweathermap.org/data/2.5/";
const imgUrl = "https://openweathermap.org/img/w/";

window.addEventListener("load", async e => {
	await updateCitySelector();
	citySelector.value = defaultCityId;
	citySelector.addEventListener("change", e => {
		updateWeather(e.target.value);
	});
	updateWeather();
});

async function updateCitySelector() {
	const citiesJson = await fetch("./city.cs.list.json");
	const cities = await citiesJson.json();

	citySelector.innerHTML = cities.map(
		src => `<option value="${src.id}">${src.name}</options>`
		).join('\n');
};

async function updateWeather(cityId = defaultCityId) {
	const weatherJson = await fetch(`${weatherUrl}weather?id=${cityId}&appid=${appKey}${requestOpt}`);
	const weather = await weatherJson.json();
	main.innerHTML = printWeather(weather);
};

function printWeather(weather) {
	return `
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

