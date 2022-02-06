import "./css/index.scss";
import "./map";
import initMap from "./map";

// init the map once the user starts scrolling
window.addEventListener("scroll", initMap, { once: true, passive: true });
