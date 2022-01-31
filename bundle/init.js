import "./css/index.scss";
import "./map";

var connection =
  navigator.connection ||
  navigator.mozConnection ||
  navigator.webkitConnection ||
  {};
var connectionType = connection.effectiveType || "4g";
var isMobile = window.innerWidth <= 414;
