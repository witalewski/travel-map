import { TravelMapAction } from "./actions";

const initialState: AppState = {
  previousState: null,
  destinations: [],
  currentDestinationIndex: 0,
  currentDestination: null,
  currentPhotoIndex: 0,
  currentPhoto: "",
  displayPhoto: false
};

const isShowingLastPhotoInDestination: (state: AppState) => boolean = state =>
  !state.currentDestination.photos ||
  state.currentPhotoIndex === state.currentDestination.photos.length;

const hidePhoto: (state: AppState) => AppState = state => {
  if (!state.displayPhoto) {
    return state;
  }
  return {
    ...state,
    displayPhoto: false,
    previousState: state
  };
};

const nextDestination: (state: AppState) => AppState = state => {
  if (state.currentDestinationIndex < state.destinations.length - 1) {
    return {
      ...state,
      currentPhotoIndex: 0,
      displayPhoto: false,
      currentDestinationIndex: state.currentDestinationIndex + 1,
      currentDestination: state.destinations[state.currentDestinationIndex + 1],
      previousState: state
    };
  }
  return hidePhoto(state);
};

const nextPhoto: (state: AppState) => AppState = state => ({
  ...state,
  currentPhotoIndex: state.currentPhotoIndex + 1,
  displayPhoto: true,
  currentPhoto: state.currentDestination.photos[state.currentPhotoIndex],
  previousState: state
});

export const rootReducer: (
  state: AppState,
  action: TravelMapAction
) => AppState = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_DESTINATIONS": {
      return {
        ...state,
        destinations: action.destinations,
        currentDestination: action.destinations[0]
      };
    }
    case "NEXT": {
      return isShowingLastPhotoInDestination(state)
        ? nextDestination(state)
        : nextPhoto(state);
    }
    case "PREV": {
      return state.previousState ? state.previousState : state;
    }
    default:
      return state;
  }
};
