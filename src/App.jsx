import React from "react";

import india from "../static/india.yaml";
import {
  renderMap,
  addMarker,
  getBounds,
  scaleBounds,
  addAnimatedSegment,
  addRoute,
  addSolidSegments
} from "./map";
import { Promise } from "q";

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

  componentDidMount() {
    this.map = renderMap("map");

    const locationPromises = india.map(location =>
      addMarker(location, this.map)
    );
    Promise.all(locationPromises).then(markers => {
      const locationCoords = markers.map(marker => marker._lngLat);
      this.setState({
        locationCoords
      });
      this.zoomToBounds(this.state.locationCoords);
      setTimeout(() => {
        this.setState({ showMarkers: true });
        addRoute(this.map, locationCoords);
      }, 1500);
    });

    document.addEventListener("keyup", event => {
      if (event.code === "Space") {
        this.next();
      }
    });
  }

  next() {
    const {
      currentSlide,
      currentPhotoIndex,
      locationCoords,
      showPhoto
    } = this.state;
    const currentLocation = india[currentSlide];
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
    return (
      <main
        className={`main ${this.state.showMarkers ? "" : "main--hide-markers"}`}
      >
        <div id="map" />
        <img
          className={`photo ${this.state.showPhoto ? "" : "photo--hidden"}`}
          src={this.state.currentPhotoSource}
        />
      </main>
    );
  }
}
