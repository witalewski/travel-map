export class NextSlideAction {
  readonly type = "NEXT_SLIDE";
}

export class NextPhotoAction {
  readonly type = "NEXT_PHOTO";
}

export class SetLocationCoordsAction {
  readonly type = "SET_LOCATION_COORDS";
  locationCoords: Location[];
}

export class ShowMarkersAction {
  readonly type = "SHOW_MARKERS";
}

export type Action =
  | NextSlideAction
  | NextPhotoAction
  | SetLocationCoordsAction
  | ShowMarkersAction;

export const nextSlide: () => NextSlideAction = () => ({
  type: "NEXT_SLIDE"
});

export const nextPhoto: () => NextPhotoAction = () => ({
  type: "NEXT_PHOTO"
});

export const setLocationCoords: (
  locationCoords: Location[]
) => SetLocationCoordsAction = locationCoords => ({
  type: "SET_LOCATION_COORDS",
  locationCoords
});

export const showMarkers: () => ShowMarkersAction = () => ({
  type: "SHOW_MARKERS"
});
