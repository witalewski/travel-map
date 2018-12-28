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
import { next } from "./state/actions";

export class App extends React.Component<
  {
    destinations: Destination[];
    currentDestinationIndex: number;
    currentDestination: Destination;
    currentPhotoIndex: number;
    currentPhoto: string;
    displayPhoto: boolean;
    next: () => void;
    showMarkers: () => void;
  },
  { displayMarkers: Boolean; destinationsCoordinates: Coords[] }
> {
  state = {
    displayMarkers: false,
    destinationsCoordinates: []
  };

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
    const { destinations } = this.props;
    this.map = renderMap("map");
    Promise.all(destinations.map(this.addDestinationMarker)).then(markers => {
      const destinationsCoordinates = this.getdestinationsCoordinates(markers);
      this.setState({ destinationsCoordinates });
      this.zoomToBounds(destinationsCoordinates);
      setTimeout(() => {
        this.setState({ displayMarkers: true });
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
    const { currentDestinationIndex } = this.props;
    const { destinationsCoordinates } = this.state;
    if (currentDestinationIndex !== prevProps.currentDestinationIndex) {
      if (currentDestinationIndex > 0) {
        addSolidSegments(
          this.map,
          destinationsCoordinates
            .slice(0, currentDestinationIndex)
        );
        this.zoomToBounds(
          destinationsCoordinates
            .slice(
              Math.max(currentDestinationIndex - 1, 0),
              Math.min(currentDestinationIndex + 1, destinationsCoordinates.length)
            )
        );
        setTimeout(() => {
          addAnimatedSegment(
            this.map,
            destinationsCoordinates
              .slice(currentDestinationIndex - 1, currentDestinationIndex + 1)
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
    const { displayPhoto, currentPhoto } = this.props;
    return (
      <main
        className={`main ${
          this.state.displayMarkers ? "" : "main--hide-markers"
        }`}
      >
        <div id="map" />
        {displayPhoto && <img className="photo" src={currentPhoto} />}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  destinations: state.destinations,
  currentDestinationIndex: state.currentDestinationIndex,
  currentDestination: state.currentDestination,
  currentPhotoIndex: state.currentPhotoIndex,
  currentPhoto: state.currentPhoto,
  displayPhoto: state.displayPhoto
});
const mapDispatchToProps = {
  next
};

export const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
