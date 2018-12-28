import { Action } from "./actions";
import travelMap from "../../static/travelMap.yaml";

const initialState: AppState = {
  previousState: null,
  destinations: travelMap,
  currentDestinationIndex: 0,
  currentDestination: travelMap[0],
  currentPhotoIndex: 0,
  currentPhoto: "",
  displayPhoto: false
};

const isShowingLastPhotoInDestination: (state: AppState) => boolean = state =>
  !state.currentDestination.photos ||
  state.currentPhotoIndex === state.currentDestination.photos.length;

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

const nextState = state => ({
  ...(isShowingLastPhotoInDestination(state)
    ? nextDestination(state)
    : nextPhoto(state)),
  prevState: state
});

export const rootReducer: (state: AppState, action: Action) => AppState = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "NEXT": {
      return nextState(state);
    }
    default:
      return state;
  }
};
