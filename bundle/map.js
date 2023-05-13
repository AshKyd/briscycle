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

/**
 * Make a style to render the OpenStreetMap data.
 */
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
  const container = document.querySelector("#map");
  if (config.geo?.height) {
    container.style.height = config.geo?.height;
  }
  const map = new maplibregl.Map({
    container: container,
    style: getStyle(), // style URL
    center: config.geo?.lat ? config.geo : [153, -27.5], // starting position [lng, lat]
    zoom: config.geo?.zoom || 8, // starting zoom
  });
  map.addControl(
    new maplibregl.AttributionControl({
      compact: false,
      customAttribution:
        '© <a target="_blank" rel="noopener" href="https://openstreetmap.org/">OSM contributors</a> ♥ <a target="_blank" rel="noopener" href="https://donate.openstreetmap.org" class="donate-attr">Donate</a> ♥ Powered by <a target="_blank" rel="noopener" href="https://maplibre.org/">MapLibre GL JS</a>.',
    })
  );
  map.scrollZoom.disable();
  map.addControl(new maplibregl.NavigationControl());

  // add geojson
  const geojson =
    loadedJson ||
    (Array.isArray(config.geojson) ? config.geojson?.[0] : config.geojson);

  if (!geojson) return;

  map.on("load", () => {
    const id = "briscycleCustomRoute";

    const lineStyle = ({ color, dashArray, width = 6 }) => ({
      type: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": color,
        "line-width": width,
        ...(dashArray ? { "line-dasharray": dashArray } : {}),
      },
      filter: ["==", "$type", "LineString"],
    });

    const greenTypes = ["path", "cycleway", "track"];
    const primaryColour = config.geo?.colour || "#00ff00";
    const secondaryColour = "#666";

    // HTML popups
    const points = filterProps(
      geojson,
      (props, feature) => feature.geometry.type === "Point"
    );
    points.features.forEach((point) => {
      if (!point?.properties.html) {
        return;
      }
      const popup = new maplibregl.Popup({
        className: "my-class",
        closeButton: true,
      })
        .setHTML(point.properties.html)
        .setMaxWidth("300px");

      const marker = new maplibregl.Marker()
        .setLngLat(point.geometry.coordinates)
        .addTo(map)
        .setPopup(popup);
    });

    // a geojson with the points stripped out
    const lines = filterProps(
      geojson,
      (props, feature) => feature.geometry.type === "LineString"
    );

    // underlay/stroke
    addLayer(map, lines, lineStyle({ color: "#fff", width: 10 }));

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
      padding: 60,
    });

    const legend = `
    <ul class="map-meta__legend-list">
      <li class="map-meta__legend-item"><div  class="map-meta__legend-line" style="background: ${primaryColour}"></div> ${
      otherLines.features.length ? "bike path/footpath/trail" : "Route"
    }</li>
      ${
        otherLines.features.length
          ? `
        <li class="map-meta__legend-item"><div class="map-meta__legend-line" style="background: ${secondaryColour}"></div> Road riding</li>
      `
          : ""
      }
    </ul>
    `;

    document.querySelector(".map-meta__legend").innerHTML = legend;
  });
}
