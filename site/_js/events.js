
// complicated logic to fire events and retry if the page reloaded in the interim
function fireEvents() {
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

function fireEvent(eventName) {
  if (window.umami) {
    umami.track(eventName);
    return;
  }
  const events = get("eventCache", [], "sessionStorage");
  events.push(eventName);
  set("eventCache", events, "sessionStorage");
  fireEvents();
}

function initEvents() {
  document.querySelectorAll("[data-event]").forEach((element) => {
    element.addEventListener("click", async (e) =>
      fireEvent(element.dataset.event)
    );
  });

  // fire any remaining events on page load.
  fireEvents();
}
