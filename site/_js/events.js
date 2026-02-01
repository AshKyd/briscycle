import { get, set, unlink } from "./storage.js";

// complicated logic to fire events and retry if the page reloaded in the interim
export function fireEvents() {
  if (!window.umami) {
    return setTimeout(fireEvents, 1000);
  }
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
    events.forEach((event) => umami.track(event));
    unlink("eventCache", "sessionStorage");
  }, 1000);
}

export function fireEvent(payload) {
  if (window.umami) {
    if (payload) {
      umami.track(payload);
    } else {
      umami.track();
    }
    return;
  }
  const events = get("eventCache", [], "sessionStorage");
  events.push(payload);
  set("eventCache", events, "sessionStorage");
  fireEvents();
}

export function initEvents() {
  const website = document.querySelector(
    'script[src="https://u.kyd.au/script.js"]',
  )?.dataset.websiteId;
  if (!website) {
    return;
  }

  document.querySelectorAll("[data-event]").forEach((element) => {
    element.addEventListener("click", async (e) =>
      fireEvent(element.dataset.event),
    );
  });

  // track initial page view without hash
  fireEvent({ website, url: window.location.pathname, title: document.title });

  // fire any remaining events on page load.
  fireEvents();

  const name = "outbound-link-click";
  document.querySelectorAll("a").forEach((a) => {
    if (
      a.host !== window.location.host &&
      !a.getAttribute("data-umami-event")
    ) {
      a.setAttribute("data-umami-event", name);
      a.setAttribute("data-umami-event-url", a.href);
    }
  });
}
