import * as React from "react";
import { connect } from "react-redux";

import {
  renderMap,
  addMarker,
  getBounds,
  addAnimatedSegment,
  addRoute,
  addSolidSegments
} from "./map";
import { next, setdestinationsCoordinates, showMarkers } from "./state/actions";

export class App extends React.Component<{
  displayMarkers: boolean;
  destinationsCoordinates: Coords[];
  currentDestinationIndex: number;
  displayPhoto: boolean;
  currentPhotoIndex: number;
  currentPhoto: string;
  destinations: Destination[];
  currentDestination: Destination;
  next: () => void;
  setdestinationsCoordinates: (destinationsCoordinates: Destination[]) => void;
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

  addDestinationMarker = location => addMarker(location, this.map);

  getdestinationsCoordinates = markers =>
    markers.map((marker: MapglMarker) => marker._lngLat);

  setupMap() {
    const { destinations, showMarkers } = this.props;
    this.map = renderMap("map");
    Promise.all(destinations.map(this.addDestinationMarker)).then(markers => {
      const destinationsCoordinates = this.getdestinationsCoordinates(markers);
      this.props.setdestinationsCoordinates(destinationsCoordinates);
      this.zoomToBounds(destinationsCoordinates);
      setTimeout(() => {
        showMarkers();
        addRoute(this.map, destinationsCoordinates);
      }, 1500);
    });
  }

  onKeyUp = ({ code }) => {
    if (code === "Space" || code === "ArrowRight") {
      this.props.next();
    }
  };

  registerEventListeners = () =>
    document.addEventListener("keyup", this.onKeyUp);

  unregisterEventListeners = () =>
    document.removeEventListener("keyup", this.onKeyUp);

  componentDidUpdate(prevProps) {
    const { currentDestinationIndex, destinations } = this.props;
    if (currentDestinationIndex !== prevProps.currentDestinationIndex) {
      if (currentDestinationIndex > 0) {
        addSolidSegments(
          this.map,
          destinations
            .slice(0, currentDestinationIndex)
            .map(this.getDestinationCoords)
        );
        this.zoomToBounds(
          destinations
            .slice(
              Math.max(currentDestinationIndex - 1, 0),
              Math.min(currentDestinationIndex + 1, destinations.length)
            )
            .map(this.getDestinationCoords)
        );
        setTimeout(() => {
          addAnimatedSegment(
            this.map,
            destinations
              .slice(currentDestinationIndex - 1, currentDestinationIndex + 1)
              .map(this.getDestinationCoords)
          );
        }, 500);
      }
    }
  }

  getDestinationCoords = location => location.coords;

  zoomToBounds(coords) {
    const bounds = getBounds(coords);
    this.map.fitBounds(
      [[bounds.sw.lng, bounds.sw.lat], [bounds.ne.lng, bounds.ne.lat]],
      { maxZoom: 24, padding: { top: 200, bottom: 200, left: 400, right: 400 } }
    );
  }

  render() {
    const { displayPhoto, currentPhoto, displayMarkers } = this.props;
    return (
      <main className={`main ${displayMarkers ? "" : "main--hide-markers"}`}>
        <div id="map" />
        {displayPhoto && <img className="photo" src={currentPhoto} />}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  displayMarkers: state.displayMarkers,
  destinationsCoordinates: state.destinationsCoordinates,
  currentDestinationIndex: state.currentDestinationIndex,
  displayPhoto: state.displayPhoto,
  currentPhotoIndex: state.currentPhotoIndex,
  currentPhoto: state.currentPhoto,
  destinations: state.destinations,
  currentDestination: state.currentDestination
});
const mapDispatchToProps = {
  next,
  setdestinationsCoordinates,
  showMarkers
};

export const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
