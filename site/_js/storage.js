export function set(key, value, type = "localStorage") {
  try {
    window[type][key] = JSON.stringify(value);
  } catch (e) {}
}

export function get(key, defaultValue, type = "localStorage") {
  try {
    return JSON.parse(window[type][key]);
  } catch (e) {
    return defaultValue;
  }
}

export function unlink(key, type = "localStorage") {
  delete window[type][key];
}
