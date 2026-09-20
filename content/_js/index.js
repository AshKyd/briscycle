import ClipboardJS from "clipboard";
import mediumZoom from "medium-zoom";
import { initEvents, fireEvent } from "./events.js";
import { initFallbackAds } from "./fallback-ads.js";
import MapViewer from './map/MapViewer.js'
import { render, h } from "preact";

document.querySelectorAll(".map-config").forEach((configEl) => {
  if (!configEl) return;
  const config = JSON.parse(configEl.content.textContent);
  const root = document.createElement("div");
  root.classList.add("map-root");
  configEl.parentNode.insertBefore(root, configEl);
  configEl.parentNode.removeChild(configEl);
  
  render(
    h(MapViewer, { config }),
    root
  );
});

// Initialize Events
initEvents();

// Initialize Fallback Ads
initFallbackAds();

// Copy referral codes
const buttons = document.querySelectorAll(".copy-code__button");
if (buttons.length) {
  const clipboard = new ClipboardJS(buttons);
  clipboard.on("success", (e) => {
    e.trigger.classList.add("clicked");
  });
}

// Set up image zoom
const zoom = mediumZoom("[data-zoom-src]");
zoom.on("open", (event) => {
  fireEvent("image-zoom");
});
