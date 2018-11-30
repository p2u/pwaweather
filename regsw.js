
window.addEventListener("load", async e => {
	if ("serviceWorker" in navigator) {
		try {
			navigator.serviceWorker.register("serviceworker.js");
		} catch (error) {
		}
	}
});

