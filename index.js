"use strict";
var theweather;

window.addEventListener("load", async e => {
	initGui();
});
 
function initGui() {
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
  // ... other parameters
});

var mainView = theweather.views.create('.view-main');
}

