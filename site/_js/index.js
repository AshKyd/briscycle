import ClipboardJS from "clipboard";
import mediumZoom from "medium-zoom";
import { initMaps } from "./map.js";
import { initEvents, fireEvent } from "./events.js";
import { initFallbackAds } from "./fallback-ads.js";

// Initialize Maps
initMaps();

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

console.log('hot reloeabs')