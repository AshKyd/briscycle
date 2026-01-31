import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import htm from 'htm';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getStyle } from "./style.js";


const html = htm.bind(h);

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

let layerIdCounter = 0;
/**
 * Add a geojson layer to the map with the given styles
 */
function addLayer(map, geojson, style) {
  layerIdCounter += 1;
  const layerId = `geojson-${layerIdCounter}`;

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

export default function MapViewer({ config }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [hasOtherLines, setHasOtherLines] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const greenTypes = ["path", "cycleway", "track"];
  const primaryColour = config.geo?.colour || "#00ff00";
  const secondaryColour = "#666";
  const isBigMap = !!config.geo?.bigMap;

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    async function init() {
      const geojsonUrl = config.geo?.geojsonUrl;
      const loadedJson = geojsonUrl ? await fetch(geojsonUrl).then((res) => res.json()) : null;

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: getStyle(),
        center: config.geo?.lat ? [Number(config.geo.lng), Number(config.geo.lat)] : [153.02, -27.47],
        zoom: Number(config.geo?.zoom) || 8,
        maxBounds: [151.853, -28.48, 154.366, -26.249],
        cooperativeGestures: !isBigMap,
        hash: isBigMap,
        customAttribution: {
          compact: true,
          customAttribution:
            '© <a target="_blank" rel="noopener" href="https://openstreetmap.org/">OSM contributors</a> ♥ <a target="_blank" rel="noopener" href="https://donate.openstreetmap.org" class="donate-attr">Donate</a> ♥ Powered by <a target="_blank" rel="noopener" href="https://maplibre.org/">MapLibre</a>.',
        },
      });

      map.current.addControl(new maplibregl.NavigationControl());

      map.current.on("load", () => {
        const geojson = loadedJson || (Array.isArray(config.geojson) ? config.geojson?.[0] : config.geojson);
        if (!geojson) {
          setIsLoaded(true);
          return;
        }

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
        const points = filterProps(geojson, (props, feature) => feature.geometry.type === "Point");
        points.features.forEach((point) => {
          if (!point?.properties.html) return;
          const popup = new maplibregl.Popup({
            className: "my-class",
            closeButton: true,
          })
            .setHTML(point.properties.html)
            .setMaxWidth("300px");

          new maplibregl.Marker()
            .setLngLat(point.geometry.coordinates)
            .addTo(map.current)
            .setPopup(popup);
        });

        // Lines
        const lines = filterProps(geojson, (props, feature) => feature.geometry.type === "LineString");
        addLayer(map.current, lines, lineStyle({ color: "#fff", width: 10 }));

        const otherLines = filterProps(lines, ({ highway }) => highway && !greenTypes.includes(highway));
        addLayer(map.current, otherLines, lineStyle({ color: secondaryColour }));

        addLayer(
          map.current,
          filterProps(lines, ({ highway }) => !highway || greenTypes.includes(highway)),
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

        if (coordinates.length > 0) {
          const bounds = new maplibregl.LngLatBounds(coordinates[0], coordinates[0]);
          for (const coord of coordinates) {
            bounds.extend(coord);
          }
          map.current.fitBounds(bounds, { padding: 60 });
        }

        setHasOtherLines(otherLines.features.length > 0);
        setIsLoaded(true);
      });
    }

    init();
  }, [config]);

  return html`
    <div class="map">
      <aside class="map-meta">
        <div class="map-meta__legend">
          <ul class="map-meta__legend-list">
            <li class="map-meta__legend-item">
              <div class="map-meta__legend-line" style="background: ${primaryColour}"></div>
              ${hasOtherLines ? "bike path/footpath/trail" : "Route"}
            </li>
            <li class="map-meta__legend-item">
              <div class="map-meta__legend-line" style="background: #ddc688ff"></div>
              Shoulder/shared road/riding w cars
            </li>
            ${hasOtherLines && html`
              <li class="map-meta__legend-item">
                <div class="map-meta__legend-line" style="background: ${secondaryColour}"></div>
                Road riding
              </li>
            `}
          </ul>
        </div>
        ${config.geo?.googleMaps && html`
          <div class="map-meta__external">
            <a
              class="btn btn-secondary"
              href="${config.geo.googleMaps}"
              target="_blank"
              data-event="map-meta-google"
            >
              <svg
                class="btn__icon"
                width="20"
                height="35"
                viewBox="0 0 20 35"
              >
                <path
                  d="M10,0 C4.477,0 0,4.477 0,10 C0,17.5 10,35 10,35 C10,35 20,17.5 20,10 C20,4.477 15.523,0 10,0 Z"
                  style="fill: #ff4646; stroke: #d73534; stroke-width: 1;"
                />
                <circle cx="10" cy="10" r="3" style="fill: #590000;" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        `}
      </aside>
      <div 
        ref=${mapContainer} 
        class="inline-map" 
        style=${{ height: config.geo?.height || '400px' }}
      ></div>
    </div>
  `;
}
