function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Make a style to render the OpenStreetMap data.
 */
function getStyle() {
  const style = MAP_STYLE;

  let casingInsertionIndex;
  const casings = [];

  // Loop through each layer and do stuff.
  style.layers.forEach((layer, i) => {
    if (
      ["road", "path"].includes(layer.id.slice(0, 4)) &&
      layer.type === "line"
    ) {
      if (!casingInsertionIndex) {
        casingInsertionIndex = i;
      }

      // Road casings are grey outlines around white roads. They're pretty.
      // Duplicate the style so we can add a regular casing to it.
      (() => {
        const duplicateStyle = clone(layer);
        duplicateStyle.id = duplicateStyle.id + "_casing";
        const paint = duplicateStyle.paint;
        paint["line-color"] = {
          stops: [[13, "#e8ebf8"]],
        };

        // cycleways should be green
        if (layer.id.includes("cycle")) {
          // Bike lanes get a green casing.
          paint["line-color"] = {
            stops: [[13, "#28ab28"]],
          };
        }

        // set gap-width so the casing is drawn as 2x 1px lines either side.
        paint["line-gap-width"] = paint["line-width"];
        paint["line-width"] = 1;
        casings.push(duplicateStyle);
      })();

      // cycle lanes then
      (() => {
        const duplicateStyle = clone(layer);
        duplicateStyle.id = duplicateStyle.id + "_cycle-lane-casing";
        duplicateStyle.filter.push(["==", "cycle", "yus"]);
        const paint = duplicateStyle.paint;
        paint["line-color"] = {
          stops: [[13, "#88dd88"]],
        };

        // set gap-width so the casing is drawn as 2x 1px lines either side.
        paint["line-gap-width"] = paint["line-width"];
        paint["line-width"] = {
          base: 2,
          stops: [
            [6, 1],
            [20, 5],
          ],
        };

        casings.push(duplicateStyle);
      })();
    }
  });
  style.layers = [
    ...style.layers.slice(0, casingInsertionIndex),
    ...casings,
    ...style.layers.slice(casingInsertionIndex),
  ];
  return style;
}
