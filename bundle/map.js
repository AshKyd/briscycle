import { crelInHead, onload } from "./util";
export function initMap() {
  const configEl = document.querySelector("#map-config");
  if (!configEl) return;
  const config = JSON.parse(configEl.content.textContent);

  const ready = Promise.all([
    onload(
      crelInHead("script", {
        src: "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js",
      })
    ),
    onload(
      crelInHead("link", {
        rel: "stylesheet",
        href: "https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css",
      })
    ),
  ]);

  ready.then(() => {
    // load map
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXNoa3lkIiwiYSI6ImNsajB0NWMifQ.A8PtczW284fnWFD6dy3xLQ";
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/ashkyd/ckz2deirj000314qu6dhxh112", // style URL
      center: config.geo || [153, -27.5], // starting position [lng, lat]
      zoom: config.geo?.zoom || 8, // starting zoom
    });
    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl());

    // add geojson
    if (!config.geojson) return;
    map.on("load", () => {
      const geojson = Array.isArray(config.geojson)
        ? config.geojson[0]
        : config.geojson;
      const id = "briscycleCustomRoute";
      map.addSource(id, {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: id,
        type: "line",
        source: id,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#00ff00",
          "line-width": 6,
        },
        filter: ["==", "$type", "LineString"],
      });

      // Fit bounds
      const coordinates = geojson.features
        .reduce((features, feature) => {
          const newCoords = Array.isArray(feature.geometry.coordinates[0])
            ? feature.geometry.coordinates
            : [feature.geometry.coordinates];
          return [...features, ...newCoords];
        }, [])
        .filter((coord) => coord[0]);
      const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
      for (const coord of coordinates) {
        bounds.extend(coord);
      }
      map.fitBounds(bounds, {
        padding: 40,
      });
    });
  });
}
