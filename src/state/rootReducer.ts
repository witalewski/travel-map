import { TravelMapAction } from "./actions";

const initialState: AppState = {
  previousState: null,
  destinations: [],
  currentDestinationIndex: 0,
  currentDestination: null,
  currentMediaIndex: 0,
  currentMedia: "",
  displayMedia: false
};

const isShowingLastMediaInDestination: (state: AppState) => boolean = state =>
  !state.currentDestination.media ||
  state.currentMediaIndex === state.currentDestination.media.length;

const hideMedia: (state: AppState) => AppState = state => {
  if (!state.displayMedia) {
    return state;
  }
  return {
    ...state,
    displayMedia: false,
    previousState: state
  };
};

const nextDestination: (state: AppState) => AppState = state => {
  if (state.currentDestinationIndex < state.destinations.length - 1) {
    return {
      ...state,
      currentMediaIndex: 0,
      displayMedia: false,
      currentDestinationIndex: state.currentDestinationIndex + 1,
      currentDestination: state.destinations[state.currentDestinationIndex + 1],
      previousState: state
    };
  }
  return hideMedia(state);
};

const nextMedia: (state: AppState) => AppState = state => ({
  ...state,
  currentMediaIndex: state.currentMediaIndex + 1,
  displayMedia: true,
  currentMedia: state.currentDestination.media[state.currentMediaIndex],
  previousState: state
});

export const rootReducer: (
  state: AppState,
  action: TravelMapAction
) => AppState = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_DESTINATIONS_ACTION": {
      return {
        ...state,
        destinations: action.destinations,
        currentDestination: action.destinations[0]
      };
    }
    case "SHOW_NEXT_SLIDE_ACTION": {
      return isShowingLastMediaInDestination(state)
        ? nextDestination(state)
        : nextMedia(state);
    }
    case "SHOW_PREVIOUS_SLIDE_ACTION": {
      return state.previousState ? state.previousState : state;
    }
    default:
      return state;
  }
};
