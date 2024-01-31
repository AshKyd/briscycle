function set(key, value, type = "localStorage") {
  try {
    window[type][key] = JSON.stringify(value);
  } catch (e) {}
}

function get(key, defaultValue, type = "localStorage") {
  try {
    return JSON.parse(window[type][key]);
  } catch (e) {
    return defaultValue;
  }
}

function unlink(key, type = "localStorage") {
  delete window[type][key];
}
