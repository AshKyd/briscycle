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

function initMaps() {
  document.querySelectorAll(".map-config").forEach((configEl) => {
    if (!configEl) return;
    const config = JSON.parse(configEl.content.textContent);
    initMap({ config, configEl }).catch((e) => {
      throw e;
    });
  });
}

async function initMap({ config, configEl }) {
  const greenTypes = ["path", "cycleway", "track"];
  const primaryColour = config.geo?.colour || "#00ff00";
  const secondaryColour = "#666";
  // put all the things in the page
  const root = document.createElement("div");
  root.classList.add("map");
  root.innerHTML = `<div class="map">
  <aside class="map-meta">
    <div class="map-meta__legend"></div>
    ${
      config.geo?.googleMaps
        ? `
    <div class="map-meta__external">
    <a
      class="btn btn-secondary"
      href="${config.geo.googleMaps}"
      target="_blank"
      data-event="map-meta-google"
    >
      <svg
      class="btn__icon"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="5.6444445mm"
      height="9.847393mm"
      viewBox="0 0 20 34.892337"
      id="svg3455"
      version="1.1"
      inkscape:version="0.91 r13725"
      sodipodi:docname="Map Pin.svg"
      >
      <defs id="defs3457" />
      <sodipodi:namedview
        id="base"
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1.0"
        inkscape:pageopacity="0.0"
        inkscape:pageshadow="2"
        inkscape:zoom="12.181359"
        inkscape:cx="8.4346812"
        inkscape:cy="14.715224"
        inkscape:document-units="px"
        inkscape:current-layer="layer1"
        showgrid="false"
        inkscape:window-width="1024"
        inkscape:window-height="705"
        inkscape:window-x="-4"
        inkscape:window-y="-4"
        inkscape:window-maximized="1"
        fit-margin-top="0"
        fit-margin-left="0"
        fit-margin-right="0"
        fit-margin-bottom="0"
      />
      <g
        inkscape:label="Layer 1"
        inkscape:groupmode="layer"
        id="layer1"
        transform="translate(-814.59595,-274.38623)"
      >
        <g
        id="g3477"
        transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)"
        >
        <path
          sodipodi:nodetypes="sscccccsscs"
          inkscape:connector-curvature="0"
          id="path4337-3"
          d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z"
          style="
          display: inline;
          opacity: 1;
          fill: #ff4646;
          fill-opacity: 1;
          stroke: #d73534;
          stroke-width: 1;
          stroke-miterlimit: 4;
          stroke-dasharray: none;
          stroke-opacity: 1;
          "
        />
        <circle
          r="3.0355"
          cy="288.25278"
          cx="823.03064"
          id="path3049"
          style="
          display: inline;
          opacity: 1;
          fill: #590000;
          fill-opacity: 1;
          stroke-width: 0;
          "
        />
        </g>
      </g>
      </svg>
  
      Open in Google Maps</a>
    </div>
    `
        : ""
    }
  </aside>
  </div>
  <div class="inline-map"></div>
  
  </div>`;

  configEl.parentNode.insertBefore(root, configEl);
  configEl.parentNode.removeChild(configEl);

  const [, , loadedJson] = await Promise.all([
    onloadPromise(
      crelInHead("script", {
        type: "text/javascript",
        src: "https://www.unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.js",
      })
    ),

    onloadPromise(
      crelInHead("link", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://www.unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.css",
      })
    ),
    config.geo?.geojsonUrl &&
      fetch(config.geo.geojsonUrl).then((res) => res.json()),
  ]);

  // load map
  maplibregl.accessToken =
    "pk.eyJ1IjoiYXNoa3lkIiwiYSI6ImNsajB0NWMifQ.A8PtczW284fnWFD6dy3xLQ";
  const container = root.querySelector(".inline-map");
  if (config.geo?.height) {
    container.style.height = config.geo?.height;
  }
  const map = new maplibregl.Map({
    container: container,
    style: getStyle(), // style URL
    center: config.geo?.lat ? config.geo : [153, -27.5], // starting position [lng, lat]
    zoom: config.geo?.zoom || 8, // starting zoom
    customAttribution: {
      compact: true,
      customAttribution:
        '© <a target="_blank" rel="noopener" href="https://openstreetmap.org/">OSM contributors</a> ♥ <a target="_blank" rel="noopener" href="https://donate.openstreetmap.org" class="donate-attr">Donate</a> ♥ Powered by <a target="_blank" rel="noopener" href="https://maplibre.org/">MapLibre</a>.',
    },
  });
  map.scrollZoom.disable();
  map.addControl(new maplibregl.NavigationControl());

  // add geojson
  const geojson =
    loadedJson ||
    (Array.isArray(config.geojson) ? config.geojson?.[0] : config.geojson);


  const hasOtherLines = await new Promise(resolve => map.on("load", () => {
    if (!geojson) return resolve(false);
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
    return resolve(!!otherLines.features.length)
  }));



    const legend = `
    <ul class="map-meta__legend-list">
      <li class="map-meta__legend-item"><div  class="map-meta__legend-line" style="background: ${primaryColour}"></div> ${
      hasOtherLines ? "bike path/footpath/trail" : "Route"
    }</li>
    <li class="map-meta__legend-item"><div class="map-meta__legend-line" style="background: #ddc688ff"></div> Shoulder/shared road/riding w cars</li>
      ${
        hasOtherLines
          ? `
        <li class="map-meta__legend-item"><div class="map-meta__legend-line" style="background: ${secondaryColour}"></div> Road riding</li>
      `
          : ""
      }
    </ul>
    `;

    root.querySelector(".map-meta__legend").innerHTML = legend;
}

console.log("initting maps");
initMaps();
