import * as React from "react";

import travelMap from "../static/travelMap.yaml";
import {
  renderMap,
  addMarker,
  getBounds,
  addAnimatedSegment,
  addRoute,
  addSolidSegments
} from "./map";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMarkers: false,
      locationCoords: [],
      currentSlide: 0,
      showPhoto: false,
      currentPhotoIndex: 0,
      currentPhotoSource: ""
    };
  }

  state: AppState;
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
    Promise.all(travelMap.map(this.addLocationMarker)).then(markers => {
      const locationCoords = this.getLocationCoords(markers);
      this.setState({
        locationCoords
      });
      this.zoomToBounds(locationCoords);
      setTimeout(() => {
        this.setState({ showMarkers: true });
        addRoute(this.map, locationCoords);
      }, 1500);
    });
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
      showPhoto
    } = this.state;
    const currentLocation = travelMap[currentSlide];
    if (
      !currentLocation.photos ||
      currentPhotoIndex === currentLocation.photos.length
    ) {
      if (currentSlide < locationCoords.length - 1) {
        this.setState({
          currentPhotoIndex: 0,
          showPhoto: false,
          currentSlide: currentSlide + 1
        });
      } else if (showPhoto) {
        this.setState({
          showPhoto: false
        });
      }
    } else {
      this.setState({
        currentPhotoIndex: currentPhotoIndex + 1,
        showPhoto: true,
        currentPhotoSource: currentLocation.photos[currentPhotoIndex]
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { currentSlide, locationCoords } = this.state;
    if (currentSlide !== prevState.currentSlide) {
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
    const { showPhoto, currentPhotoSource } = this.state;
    return (
      <main
        className={`main ${this.state.showMarkers ? "" : "main--hide-markers"}`}
      >
        <div id="map" />
        {showPhoto && <img className="photo" src={currentPhotoSource} />}
      </main>
    );
  }
}
