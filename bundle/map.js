import { crelInHead, onload } from "./util";

/**
 * Shorthand to filter a geojson object down to matching properties
 */
function filterProps(geojson, fn) {
  const output = JSON.parse(JSON.stringify(geojson));
  output.features = output.features.filter((feature) => {
    return fn(feature.properties || {}, feature);
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
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function getStyle() {
  const style = require("./map-style.json");
  let casingInsertionIndex;
  const casings = [];

  // Loop through each layer and do stuff.
  style.layers.forEach((layer, i) => {
    if (
      ["road", "path"].includes(layer.id.slice(0, 4)) &&
      layer.type === "line"
    ) {
      if (!casingInsertionIndex) {
        casingInsertionIndex = i;
      }

      // Road casings are grey outlines around white roads. They're pretty.
      // Duplicate the style so we can add a regular casing to it.
      (() => {
        const duplicateStyle = clone(layer);
        duplicateStyle.id = duplicateStyle.id + "_casing";
        const paint = duplicateStyle.paint;
        paint["line-color"] = {
          stops: [[13, "#e8ebf8"]],
        };

        // cycleways should be green
        if (layer.id.includes("cycle")) {
          // Bike lanes get a green casing.
          paint["line-color"] = {
            stops: [[13, "#28ab28"]],
          };
        }

        // set gap-width so the casing is drawn as 2x 1px lines either side.
        paint["line-gap-width"] = paint["line-width"];
        paint["line-width"] = 1;
        casings.push(duplicateStyle);
      })();

      // cycle lanes then
      (() => {
        const duplicateStyle = clone(layer);
        duplicateStyle.id = duplicateStyle.id + "_cycle-lane-casing";
        duplicateStyle.filter.push(["==", "cycle", "yus"]);
        const paint = duplicateStyle.paint;
        paint["line-color"] = {
          stops: [[13, "#88dd88"]],
        };

        // set gap-width so the casing is drawn as 2x 1px lines either side.
        paint["line-gap-width"] = paint["line-width"];
        paint["line-width"] = {
          base: 2,
          stops: [
            [6, 1],
            [20, 5],
          ],
        };

        // duplicateStyle.paint = {
        //   "line-color": "#ff0000",
        //   "line-width": {
        //     base: 1,
        //     stops: [
        //       [6, 10],
        //       [20, 10],
        //     ],
        //   },
        // };

        casings.push(duplicateStyle);
      })();
    }
  });
  style.layers = [
    ...style.layers.slice(0, casingInsertionIndex),
    ...casings,
    ...style.layers.slice(casingInsertionIndex),
  ];
  return style;
}

export default async function initMap() {
  const configEl = document.querySelector("#map-config");
  if (!configEl) return;
  const config = JSON.parse(configEl.content.textContent);

  const [js, css, loadedJson] = await Promise.all([
    onload(
      crelInHead("script", {
        src: "https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js",
      })
    ),
    onload(
      crelInHead("link", {
        rel: "stylesheet",
        href: "https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css",
      })
    ),

    config.geo?.geojsonUrl &&
      fetch(config.geo.geojsonUrl).then((res) => res.json()),
  ]);

  // load map
  maplibregl.accessToken =
    "pk.eyJ1IjoiYXNoa3lkIiwiYSI6ImNsajB0NWMifQ.A8PtczW284fnWFD6dy3xLQ";
  const map = new maplibregl.Map({
    container: "map", // container ID
    style: getStyle(), // style URL
    center: config.geo?.lat ? config.geo : [153, -27.5], // starting position [lng, lat]
    zoom: config.geo?.zoom || 8, // starting zoom
  });
  map.scrollZoom.disable();
  map.addControl(new maplibregl.NavigationControl());

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
    const primaryColour = config.geo?.colour || "#00ff00";
    const secondaryColour = "#00aa88";

    // a geojson with the points stripped out
    const lines = filterProps(
      geojson,
      (props, feature) => feature.geometry.type === "LineString"
    );

    // all other line types, including highway=residential/road/whatever
    const otherLines = filterProps(
      lines,
      ({ highway }) => highway && !greenTypes.includes(highway)
    );
    addLayer(map, otherLines, lineStyle({ color: secondaryColour }));

    // default lines + highway=path
    addLayer(
      map,
      filterProps(
        lines,
        ({ highway }) => !highway || greenTypes.includes(highway)
      ),
      lineStyle({ color: primaryColour })
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
    const bounds = new maplibregl.LngLatBounds(coordinates[0], coordinates[0]);
    for (const coord of coordinates) {
      bounds.extend(coord);
    }
    map.fitBounds(bounds, {
      padding: 40,
    });

    const legend = `
    <ul class="map__legend-list">
      <li class="map__legend-item"><div  class="map__legend-line" style="background: ${primaryColour}"></div> ${
      otherLines.features.length ? "bike path/footpath/trail" : "Route"
    }</li>
      ${
        otherLines.features.length
          ? `
        <li class="map__legend-item"><div class="map__legend-line" style="background: ${secondaryColour}"></div> Road riding</li>
      `
          : ""
      }
    </ul>
    `;

    document.querySelector(".map__legend").innerHTML = legend;
  });
}
