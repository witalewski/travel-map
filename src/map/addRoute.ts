import { addSegments } from "./addSegments";

export const addRoute: (map: MapglMap, coordsList: Coords[]) => void = (
  map,
  coordsList
) => addSegments(map, coordsList, "route", 0.4);
