import { interpolateLine } from "./interpolateLine";
import { createLineStringFeature } from "./createLineStringFeature";
import { createLineLayer } from "./createLineLayer";
export const addAnimatedSegment: (
  map: MapglMap,
  coordsList: Coords[],
  reverse: boolean
) => void = (map, coordsList, reverse) => {
  const animationCoords = interpolateLine(coordsList[0], coordsList[1], 24);
  const geojson = createLineStringFeature(reverse ? [...animationCoords] : []);

  if (!map.getSource("animated-segment")) {
    map.addLayer(createLineLayer("animated-segment", geojson, 1));
  } else {
    map.getSource(`animated-segment`).setData(geojson);
  }

  const animateLine = i => {
    if (reverse) {
      geojson.geometry.coordinates.pop();
    } else {
      geojson.geometry.coordinates.push(animationCoords[i]);
    }

    map.getSource(`animated-segment`).setData(geojson);

    if (i < animationCoords.length - 1) {
      requestAnimationFrame(() => animateLine(i + 1));
    }
  };

  animateLine(0);
};
