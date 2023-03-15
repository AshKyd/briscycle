import { crelInHead, onload } from "./util";

/**
 * Shorthand to filter a geojson object down to matching properties
 */
function filterProps(geojson, fn) {
  const output = JSON.parse(JSON.stringify(geojson));
  output.features = output.features.filter((feature) => {
    return fn(feature.properties, feature);
  });
  return output;
}

let id = 0;
/**
 * Add a geojson layer to the map with the given styles
 */
function addLayer(map, geojson, style) {
  id += 1;
  const layerId = `geojson-${id}`;

  map.addSource(layerId, {
    type: "geojson",
    data: geojson,
  });

  map.addLayer({
    id: layerId,
    source: layerId,
    ...style,
  });
}

export default async function initMap() {
  const configEl = document.querySelector("#map-config");
  if (!configEl) return;
  const config = JSON.parse(configEl.content.textContent);

  const [js, css, loadedJson] = await Promise.all([
    onload(
      crelInHead("script", {
        src: "https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js",
      })
    ),
    onload(
      crelInHead("link", {
        rel: "stylesheet",
        href: "https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css",
      })
    ),

    config.geo?.geojsonUrl &&
      fetch(config.geo.geojsonUrl).then((res) => res.json()),
  ]);

  // load map
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYXNoa3lkIiwiYSI6ImNsajB0NWMifQ.A8PtczW284fnWFD6dy3xLQ";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/ashkyd/ckz2deirj000314qu6dhxh112", // style URL
    center: config.geo?.lat ? config.geo : [153, -27.5], // starting position [lng, lat]
    zoom: config.geo?.zoom || 8, // starting zoom
  });
  map.scrollZoom.disable();
  map.addControl(new mapboxgl.NavigationControl());

  // add geojson
  const geojson =
    loadedJson ||
    (Array.isArray(config.geojson) ? config.geojson?.[0] : config.geojson);

  if (!geojson) return;

  map.on("load", () => {
    const id = "briscycleCustomRoute";

    const lineStyle = ({ color, dashArray }) => ({
      type: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": color,
        "line-width": 6,
        ...(dashArray ? { "line-dasharray": dashArray } : {}),
      },
      filter: ["==", "$type", "LineString"],
    });

    const greenTypes = ["path", "cycleway", "track"];

    // all other line types, including highway=residential/road/whatever
    addLayer(
      map,
      filterProps(geojson, ({ highway }) => !greenTypes.includes(highway)),
      lineStyle({ color: "#00aa88" })
    );

    // default lines + highway=path
    addLayer(
      map,
      filterProps(
        geojson,
        ({ highway }) => !highway || greenTypes.includes(highway)
      ),
      lineStyle({ color: config.geo?.colour || "#00ff00" })
    );

    console.log(
      filterProps(
        geojson,
        ({ highway }, feature) =>
          feature.geometry.type !== "Point" && !greenTypes.includes(highway)
      )
    );

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
}
