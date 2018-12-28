import { createLineStringFeature } from "./createLineStringFeature";
import { createLineLayer } from "./createLineLayer";

export const addRoute: (map: MapglMap, coordsList: Coords[]) => void = (
  map,
  coordsList
) => {
  const geojson = createLineStringFeature(
    coordsList.map(coords => [coords.lng, coords.lat])
  );

  if (!map.getSource("route")) {
    map.addLayer(createLineLayer("route", geojson, 0.4));
  } else {
    map.getSource("route").setData(geojson);
  }
};
