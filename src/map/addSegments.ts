import { createLineStringFeature } from "./createLineStringFeature";
import { createLineLayer } from "./createLineLayer";

export const addSegments: (
  map: MapglMap,
  coordsList: Coords[],
  id: string,
  opacity: number
) => void = (map, coordsList, id, opacity) => {
  const geojson = createLineStringFeature(
    coordsList.map(coords => [coords.lng, coords.lat])
  );
  if (!map.getSource(id)) {
    map.addLayer(createLineLayer(id, geojson, opacity));
  } else {
    map.getSource(id).setData(geojson);
  }
};
