import { createLineStringFeature } from "./createLineStringFeature";
import { createOrUpdateLineLayer } from "./createOrUpdateLineLayer";

export const addSegments: (
  map: MapglMap,
  coordsList: Coords[],
  id: string,
  opacity: number
) => void = (map, coordsList, id, opacity) =>
  createOrUpdateLineLayer(
    map,
    id,
    createLineStringFeature(coordsList.map(coords => [coords.lng, coords.lat])),
    opacity
  );
