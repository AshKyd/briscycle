export function crel(tag, attrs) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach((attr) => (el[attr[0]] = attr[1]));
  return el;
}

export function crelInHead(tag, attrs) {
  const el = crel(tag, attrs);
  document.head.appendChild(el);
  return el;
}

export function onloadPromise(el) {
  return new Promise((resolve, reject) => {
    el.addEventListener("load", resolve);
    el.addEventListener("error", reject);
  });
}
