import "./css/index.scss";
import "./map";
import initMap from "./map";
import ClipboardJS from "clipboard";
import domready from "domready";
import { get, set, unlink } from "./storage";

// init the map once the user starts scrolling
window.addEventListener("scroll", initMap, { once: true, passive: true });

domready(() => {
  const buttons = document.querySelectorAll(".copy-code__button");
  const clipboard = new ClipboardJS(buttons);

  clipboard.on("success", (e) => {
    e.trigger.classList.add("clicked");
  });

  // complicated logic to fire events and retry if the page reloaded in the interim
  async function fireEvents() {
    const events = get("eventCache", [], "sessionStorage");
    try {
      await Promise.all(events.map((event) => umami(element.dataset.event)));
    } catch (e) {}
    unlink("eventCache", "sessionStorage");
  }
  document.querySelectorAll("[data-event]").forEach((element) => {
    element.addEventListener("click", async (e) => {
      const events = get("eventCache", [], "sessionStorage");
      events.push(element.dataset.event);
      set("eventCache", events, "sessionStorage");
      // fire events now. Might work.
      fireEvents();
    });
  });

  // fire any remaining events on page load.
  fireEvents();
});
