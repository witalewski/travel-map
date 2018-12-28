import { createLineStringFeature } from "./createLineStringFeature";
import { createLineLayer } from "./createLineLayer";

export const addSolidSegments: (map: MapglMap, coordsList: Coords[]) => void = (
  map,
  coordsList
) => {
  const geojson = createLineStringFeature(
    coordsList.map(coords => [coords.lng, coords.lat])
  );

  if (!map.getSource("solid-segments")) {
    map.addLayer(createLineLayer("solid-segments", geojson, 1));
  } else {
    map.getSource("solid-segments").setData(geojson);
  }
};
