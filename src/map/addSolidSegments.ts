import { addSegments } from "./addSegments";

export const addSolidSegments: (map: MapglMap, coordsList: Coords[]) => void = (
  map,
  coordsList
) => addSegments(map, coordsList, "solid-segments", 1);
