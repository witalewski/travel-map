import * as React from "react";
import { connect } from "react-redux";
import { func, string, number, arrayOf, bool, shape } from "prop-types";

import {
  renderMap,
  addMarker,
  getBounds,
  addAnimatedSegment,
  addRoute,
  addSolidSegments
} from "./map";
import {
  nextSlide,
  nextPhoto,
  setLocationCoords,
  showMarkers
} from "./state/actions";

export class App extends React.Component<{
  displayMarkers: boolean;
  locationCoords: Coords[];
  currentSlide: number;
  displayPhoto: boolean;
  currentPhotoIndex: number;
  currentPhotoSource: string;
  travelMap: Location[];
  nextSlide: () => void;
  nextPhoto: () => void;
  setLocationCoords: (locationCoords: Location[]) => void;
  showMarkers: () => void;
}> {
  map: MapglMap;

  componentDidMount() {
    this.setupMap();
    this.registerEventListeners();
  }

  componentWillUnmount() {
    this.unregisterEventListeners();
  }

  addLocationMarker = location => addMarker(location, this.map);

  getLocationCoords = markers =>
    markers.map((marker: MapglMarker) => marker._lngLat);

  setupMap() {
    this.map = renderMap("map");
    Promise.all(this.props.travelMap.map(this.addLocationMarker)).then(
      markers => {
        const locationCoords = this.getLocationCoords(markers);
        this.props.setLocationCoords(locationCoords);
        this.zoomToBounds(locationCoords);
        setTimeout(() => {
          this.props.showMarkers();
          addRoute(this.map, locationCoords);
        }, 1500);
      }
    );
  }

  onKeyUp = ({ code }) => {
    if (code === "Space" || code === "ArrowRight") {
      this.next();
    }
  };

  registerEventListeners = () =>
    document.addEventListener("keyup", this.onKeyUp);

  unregisterEventListeners = () =>
    document.removeEventListener("keyup", this.onKeyUp);

  next() {
    const {
      currentSlide,
      currentPhotoIndex,
      locationCoords,
      displayPhoto,
      travelMap
    } = this.props;
    const currentLocation: Location = travelMap[currentSlide];
    console.log(currentLocation);
    if (
      !currentLocation.photos ||
      currentPhotoIndex === currentLocation.photos.length
    ) {
      this.props.nextSlide();
    } else {
      this.props.nextPhoto();
    }
  }

  componentDidUpdate(prevProps) {
    const { currentSlide, locationCoords } = this.props;
    if (currentSlide !== prevProps.currentSlide) {
      if (currentSlide > 0) {
        addSolidSegments(this.map, locationCoords.slice(0, currentSlide));
        this.zoomToBounds(
          locationCoords.slice(
            Math.max(currentSlide - 1, 0),
            Math.min(currentSlide + 1, locationCoords.length)
          )
        );
        setTimeout(() => {
          addAnimatedSegment(
            this.map,
            locationCoords.slice(currentSlide - 1, currentSlide + 1)
          );
        }, 500);
      }
    }
  }

  zoomToBounds(coords) {
    const bounds = getBounds(coords);
    this.map.fitBounds(
      [[bounds.sw.lng, bounds.sw.lat], [bounds.ne.lng, bounds.ne.lat]],
      { maxZoom: 24, padding: { top: 200, bottom: 200, left: 400, right: 400 } }
    );
  }

  render() {
    const { displayPhoto, currentPhotoSource, displayMarkers } = this.props;
    return (
      <main className={`main ${displayMarkers ? "" : "main--hide-markers"}`}>
        <div id="map" />
        {displayPhoto && <img className="photo" src={currentPhotoSource} />}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  displayMarkers: state.displayMarkers,
  locationCoords: state.locationCoords,
  currentSlide: state.currentSlide,
  displayPhoto: state.displayPhoto,
  currentPhotoIndex: state.currentPhotoIndex,
  currentPhotoSource: state.currentPhotoSource,
  travelMap: state.travelMap
});
const mapDispatchToProps = {
  nextSlide,
  nextPhoto,
  setLocationCoords,
  showMarkers
};

export const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
