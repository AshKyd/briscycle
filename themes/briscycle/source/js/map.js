var MAPBOXTOKEN = "pk.eyJ1IjoiYXNoa3lkIiwiYSI6IkVGMTRITjgifQ.qMQ0S2B-091S7U4cXhRhSg";
var MAPBOXLAYER = "ashkyd.l73nmeac";
var TILES = "https://{s}.tiles.mapbox.com/v4/" + MAPBOXLAYER + "/{z}/{x}/{y}.png?access_token=" + MAPBOXTOKEN;
console.log({json: document.querySelector('#map-config').innerText})
const config = JSON.parse(document.querySelector('#map-config').innerText);
const mymap = L.map('map', {
  scrollWheelZoom: false
}).setView(config.geo, 13);
L.tileLayer(TILES, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);