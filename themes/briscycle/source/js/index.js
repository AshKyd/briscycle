require("lazysizes");
var connection =
  navigator.connection ||
  navigator.mozConnection ||
  navigator.webkitConnection ||
  {};
var connectionType = connection.effectiveType || "4g";
var isMobile = window.innerWidth <= 414;

document.addEventListener("lazybeforeunveil", function(e) {
  console.log("running", e.target);
  var bg = e.target.dataset.background;
  var bg2x = e.target.dataset.background2x;

  var image = connectionType === "4g" && isMobile == false ? bg2x || bg : bg;
  if (image) {
    e.target.style.backgroundImage = "url(" + image + ")";
  }
});

