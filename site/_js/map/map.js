import maplibregl from "maplibre-gl";
import { getStyle } from "./style.js";
import { crelInHead, onloadPromise } from "../utils.js";
import MapViewer from './MapViewer.js'
import { render, h } from "preact";

export function initMaps() {
  document.querySelectorAll(".map-config").forEach((configEl) => {
    if (!configEl) return;
    const config = JSON.parse(configEl.content.textContent);
    initMap({ config, configEl }).catch((e) => {
      throw e;
    });
  });
}

async function initMap({ config, configEl }) {
  const root = document.createElement("div");
  root.classList.add("map-root");
  configEl.parentNode.insertBefore(root, configEl);
  configEl.parentNode.removeChild(configEl);
  
  render(
    h(MapViewer, { config }),
    root
  );
}

