import { createLineLayer } from "./createLineLayer";

export const createOrUpdateLineLayer: (
  map: MapglMap,
  id: string,
  data: Geojson,
  opacity: number
) => void = (map, id, data, opacity) => {
  if (!map.getSource(id)) {
    map.addLayer(createLineLayer(id, data, opacity));
  } else {
    map.getSource(id).setData(data);
  }
};
