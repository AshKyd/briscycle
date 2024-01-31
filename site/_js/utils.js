function crel(tag, attrs) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach((attr) => (el[attr[0]] = attr[1]));
  return el;
}

function crelInHead(tag, attrs) {
  const el = crel(tag, attrs);
  document.head.appendChild(el);
  return el;
}

function onloadPromise(el) {
  return new Promise((resolve, reject) => {
    el.addEventListener("load", resolve);
    el.addEventListener("error", reject);
  });
}
