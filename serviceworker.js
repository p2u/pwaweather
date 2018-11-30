
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
const staticAssets = [
	'./',
	'./index.html',
	'./weather.html',
	'./weather.js',
	'./forecast.html',
	'./forecast.js',
	'./city.cs.list.json',
	'./regsw.js'
];

workbox.precaching.precacheAndRoute(staticAssets);
workbox.routing.registerRoute(/https:\/\/api.openweathermap.org\/.*/, workbox.strategies.networkFirst());

