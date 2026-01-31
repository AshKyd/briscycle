const COLOR_CYCLEWAY_MAIN = "#28ab28";
const COLOR_CYCLEWAY_LANE = "#88dd88";
const COLOR_CYCLEWAY_OTHER = "#ddc688ff";
const COLOR_CASING_DEFAULT = "#e8ebf8";
const PATH_CASE=0.25;
const ROAD_CASE=1;

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns a Mapbox GL JS expression to determine the color of a cycleway.
 *
 * @param {string} defaultValue
 */
function getCyclewayColorExpression(defaultValue) {
  const lesserValues = ["shoulder", "shared_lane", "advisory"];
  return [
    "case",
    [
      "any",
      ["in", ["coalesce", ["get", "cycleway"], ""], ["literal", lesserValues]],
      [
        "in",
        ["coalesce", ["get", "cycleway_left"], ""],
        ["literal", lesserValues],
      ],
      [
        "in",
        ["coalesce", ["get", "cycleway_right"], ""],
        ["literal", lesserValues],
      ],
      [
        "in",
        ["coalesce", ["get", "cycleway_both"], ""],
        ["literal", lesserValues],
      ],
    ],
    COLOR_CYCLEWAY_OTHER,
    defaultValue,
  ];
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
        paint["line-color"] = COLOR_CASING_DEFAULT;

        // cycleways should be green
        if (layer.id.includes("cycle")) {
          // Bike lanes get a green casing.
          paint["line-color"] = getCyclewayColorExpression(COLOR_CYCLEWAY_MAIN);
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
        duplicateStyle.filter.push([
          "any",
          ["==", "cycle", "yus"],
          ["all", ["has", "cycleway"], ["!in", "cycleway", "no", "none", ""]],
          [
            "all",
            ["has", "cycleway_left"],
            ["!in", "cycleway_left", "no", "none", ""],
          ],
          [
            "all",
            ["has", "cycleway_right"],
            ["!in", "cycleway_right", "no", "none", ""],
          ],
          [
            "all",
            ["has", "cycleway_both"],
            ["!in", "cycleway_both", "no", "none", ""],
          ],
        ]);
        const paint = duplicateStyle.paint;
        paint["line-color"] = getCyclewayColorExpression(COLOR_CYCLEWAY_LANE);

        // set gap-width so the casing is drawn as 2px lines either side.
        paint["line-gap-width"] = paint["line-width"];
                paint["line-width"] = {
          base: 2,
          stops: paint["line-width"].stops.map(([zoom,width]) => [zoom, width+
          (layer.id.startsWith("path") ? PATH_CASE : ROAD_CASE)]
        ),
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
