import "./css/index.scss";
import "./map";
import initMap from "./map";
import ClipboardJS from "clipboard";
import domready from "domready";
import { get, set, unlink } from "./storage";

// init the map once the user starts scrolling
window.addEventListener("scroll", initMap, { once: true, passive: true });

domready(() => {
  // Copy referral codes
  const buttons = document.querySelectorAll(".copy-code__button");
  const clipboard = new ClipboardJS(buttons);
  clipboard.on("success", (e) => {
    e.trigger.classList.add("clicked");
  });

  // complicated logic to fire events and retry if the page reloaded in the interim
  function fireEvents() {
    const events = get("eventCache", [], "sessionStorage");
    let count = 0;
    const interval = setInterval(function () {
      if (!window.umami) {
        count++;
        // give up after 15 seconds.
        if (count > 15) {
          clearInterval(interval);
          unlink("eventCache", "sessionStorage");
        }
        return;
      }
      clearInterval(interval);
      events.forEach((event) => umami(event));
      unlink("eventCache", "sessionStorage");
    }, 1000);
  }
  document.querySelectorAll("[data-event]").forEach((element) => {
    element.addEventListener("click", async (e) => {
      const events = get("eventCache", [], "sessionStorage");
      events.push(element.dataset.event);
      set("eventCache", events, "sessionStorage");

      setTimeout(() => {
        // fire events now. Might work.
        fireEvents();
      }, 5000);
    });
  });

  // fire any remaining events on page load.
  fireEvents();
});
