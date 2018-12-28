import { getBounds } from "./getBounds";

export const fitBounds: (
  map: MapglMap,
  destinationsCoordinates: Coords[],
  start?: number,
  end?: number
) => void = (map, destinationsCoordinates, start, end) => {
  const bounds: Bounds = getBounds(
    destinationsCoordinates.slice(
      isNaN(start) ? 0 : Math.max(0, start),
      isNaN(end) ? destinationsCoordinates.length : end
    )
  );
  map.fitBounds(
    [[bounds.sw.lng, bounds.sw.lat], [bounds.ne.lng, bounds.ne.lat]],
    { maxZoom: 24, padding: { top: 200, bottom: 200, left: 400, right: 400 } }
  );
};
