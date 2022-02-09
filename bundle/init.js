import "./css/index.scss";
import "./map";
import initMap from "./map";
import ClipboardJS from "clipboard";
import domready from "domready";

// init the map once the user starts scrolling
window.addEventListener("scroll", initMap, { once: true, passive: true });

domready(() => {
  const buttons = document.querySelectorAll(".copy-code__button");
  const clipboard = new ClipboardJS(buttons);

  clipboard.on("success", (e) => {
    e.trigger.classList.add("clicked");
  });
});
