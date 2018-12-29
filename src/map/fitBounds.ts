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

  const paddingRatio = isNaN(start) ? 0.1 : 0.25;
  const horizontalPadding = window.innerWidth * paddingRatio;
  const verticalPadding = window.innerHeight * paddingRatio;

  map.fitBounds(
    [[bounds.sw.lng, bounds.sw.lat], [bounds.ne.lng, bounds.ne.lat]],
    {
      padding: {
        top: verticalPadding,
        bottom: verticalPadding,
        left: horizontalPadding,
        right: horizontalPadding
      }
    }
  );
};
