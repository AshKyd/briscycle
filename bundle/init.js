import "./css/index.scss";
import "./map";
import { initMaps } from "./map";
import ClipboardJS from "clipboard";
import domready from "domready";
import { initFallbackAds } from "./fallbackads.js";
import { initEvents } from "./events.js";

domready(() => {
  // Copy referral codes
  const buttons = document.querySelectorAll(".copy-code__button");
  const clipboard = new ClipboardJS(buttons);
  clipboard.on("success", (e) => {
    e.trigger.classList.add("clicked");
  });

  initEvents();

  initMaps();

  initFallbackAds();
});
