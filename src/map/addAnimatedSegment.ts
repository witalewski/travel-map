import { interpolateLine } from "./interpolateLine";
import { createLineStringFeature } from "./createLineStringFeature";
import { createOrUpdateLineLayer } from "./createOrUpdateLineLayer";
export const addAnimatedSegment: (
  map: MapglMap,
  coordsList: Coords[],
  reverse: boolean
) => void = (map, coordsList, reverse) => {
  const id = "animated-segment";
  const animationCoords = interpolateLine(coordsList[0], coordsList[1], 24);
  const geojson = createLineStringFeature(reverse ? [...animationCoords] : []);

  createOrUpdateLineLayer(map, id, geojson, 1);

  const animateLine = i => {
    if (reverse) {
      geojson.geometry.coordinates.pop();
    } else {
      geojson.geometry.coordinates.push(animationCoords[i]);
    }

    map.getSource(id).setData(geojson);

    if (i < animationCoords.length - 1) {
      requestAnimationFrame(() => animateLine(i + 1));
    }
  };

  animateLine(0);
};
