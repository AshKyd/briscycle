import MAP_STYLE from "./map-style.json";

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
 * Make a style to render the OpenStreetMap data.
 */
export function getStyle() {
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


      // cycle lanes then
      (() => {
        const duplicateStyle = clone(layer);
        duplicateStyle.id = duplicateStyle.id + "_cycle-lane-casing";
        duplicateStyle.filter.push(["in", "cycle", "yus", "kinda"]);
        const paint = duplicateStyle.paint;
        paint["line-color"] = [
          "match",
          ["get", "cycle"],
          "kinda",
          COLOR_CYCLEWAY_OTHER,
          defaultValue,
        ];

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
