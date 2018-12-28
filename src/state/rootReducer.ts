import { Action } from "./actions";
import travelMap from "../../static/travelMap.yaml";

const initialState: AppState = {
  displayMarkers: false,
  locationCoords: [],
  currentSlide: 0,
  displayPhoto: false,
  currentPhotoIndex: 0,
  currentPhotoSource: "",
  travelMap
};

export const rootReducer: (state: AppState, action: Action) => AppState = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "NEXT_SLIDE": {
      {
        if (state.currentSlide < state.locationCoords.length - 1) {
          return {
            ...state,
            currentPhotoIndex: 0,
            displayPhoto: false,
            currentSlide: state.currentSlide + 1
          };
        }
        return {
          ...state,
          displayPhoto: false
        };
      }
    }
    case "NEXT_PHOTO": {
      const currentLocation: Location = state.travelMap[state.currentSlide];
      return {
        ...state,
        currentPhotoIndex: state.currentPhotoIndex + 1,
        displayPhoto: true,
        currentPhotoSource: currentLocation.photos[state.currentPhotoIndex]
      };
    }
    case "SET_LOCATION_COORDS": {
      return {
        ...state,
        locationCoords: action.locationCoords
      };
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
