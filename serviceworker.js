const staticAssets = [
	'./',
	'./favicon.ico',
	'./index.html',
	'./index.js',
	'./regsw.js',
	'./weather.html',
	'./weather.js',
	'./city.cs.list.json',
	'./forecast.html',
	'./forecast.js',
	'./framework7.min.css',
	'./framework7.min.js'
];

self.addEventListener('install', async e => {
	const cache = await caches.open('theweather-static');
	cache.addAll(staticAssets);
});

self.addEventListener('fetch', e => {
	const req = e.request;
	const url = new URL(req.url);

	if (url.origin == location.origin) {
		e.respondWith(cacheFirst(req));
	} else {
		e.respondWith(networkFirst(req));
	}
});

async function cacheFirst(req) {
	const cachedResponse = await caches.match(req);
	return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
	const cache = await caches.open('theweather-dynamic');
	try {
		const res = await fetch(req);
		cache.put(req, res.clone());
		return res;
	} catch (error) {
		return await cache.match(req);
	}
}

