import { interpolateLine } from "./interpolateLine";
export const addAnimatedSegment: (
  map: MapglMap,
  coordsList: Coords[]
) => void = (map, coordsList) => {
  const animationCoords = interpolateLine(coordsList[0], coordsList[1], 24);

  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: []
    }
  };

  if (!map.getSource("animated-segment")) {
    map.addLayer({
      id: `animated-segment`,
      type: "line",
      source: {
        type: "geojson",
        data: geojson
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#cb4b16",
        "line-width": 8,
        "line-opacity": 1
      }
    });
  }

  const animateLine = i => {
    geojson.geometry.coordinates.push(animationCoords[i]);
    map.getSource(`animated-segment`).setData(geojson);
    if (i < animationCoords.length - 1) {
      requestAnimationFrame(() => animateLine(i + 1));
    }
  };

  animateLine(0);
};
