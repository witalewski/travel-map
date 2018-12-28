export class NextAction {
  readonly type = "NEXT";
}

export class SetdestinationsCoordinatesAction {
  readonly type = "SET_LOCATION_COORDS";
  destinationsCoordinates: Coords[];
}

export class ShowMarkersAction {
  readonly type = "SHOW_MARKERS";
}

export type Action =
  | NextAction
  | SetdestinationsCoordinatesAction
  | ShowMarkersAction;

export const next: () => NextAction = () => ({
  type: "NEXT"
});

export const setdestinationsCoordinates: (
  destinationsCoordinates: Coords[]
) => SetdestinationsCoordinatesAction = destinationsCoordinates => ({
  type: "SET_LOCATION_COORDS",
  destinationsCoordinates
});

export const showMarkers: () => ShowMarkersAction = () => ({
  type: "SHOW_MARKERS"
});
