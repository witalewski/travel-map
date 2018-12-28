import { Action } from "./actions";
import travelMap from "../../static/travelMap.yaml";

const initialState: AppState = {
  destinations: travelMap,
  currentDestinationIndex: 0,
  currentDestination: travelMap[0],
  currentPhotoIndex: 0,
  currentPhoto: "",
  displayPhoto: false,
  displayMarkers: false
};

const hidePhoto: (state: AppState) => AppState = state => ({
  ...state,
  displayPhoto: false
});

const nextDestination: (state: AppState) => AppState = state => {
  if (state.currentDestinationIndex < state.destinations.length - 1) {
    return {
      ...state,
      currentPhotoIndex: 0,
      displayPhoto: false,
      currentDestinationIndex: state.currentDestinationIndex + 1,
      currentDestination: state.destinations[state.currentDestinationIndex + 1]
    };
  }
  return hidePhoto(state);
};

const nextPhoto: (state: AppState) => AppState = state => ({
  ...state,
  currentPhotoIndex: state.currentPhotoIndex + 1,
  displayPhoto: true,
  currentPhoto: state.currentDestination.photos[state.currentPhotoIndex]
});

const isShowingLastPhotoInDestination: (state: AppState) => boolean = state =>
  !state.currentDestination.photos ||
  state.currentPhotoIndex === state.currentDestination.photos.length;

const addCoordinatesToLocations: (
  state: AppState,
  coordsList: Coords[]
) => AppState = (state, coordsList) => ({
  ...state,
  destinations: state.destinations.map((location, i) => ({
    ...location,
    coords: coordsList[i]
  }))
});

export const rootReducer: (state: AppState, action: Action) => AppState = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "NEXT": {
      {
        if (isShowingLastPhotoInDestination(state)) {
          return nextDestination(state);
        }
        return nextPhoto(state);
      }
    }
    case "SET_LOCATION_COORDS": {
      return addCoordinatesToLocations(state, action.destinationsCoordinates);
    }
    case "SHOW_MARKERS": {
      return {
        ...state,
        displayMarkers: true
      };
    }
    default:
      return state;
  }
};
