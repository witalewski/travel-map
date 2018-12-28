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

  onKeyUp = ({ code }) => {
    if (code === "Space" || code === "ArrowRight") {
      this.props.next();
    }
  };

  registerEventListeners = () =>
    document.addEventListener("keyup", this.onKeyUp);

  unregisterEventListeners = () =>
    document.removeEventListener("keyup", this.onKeyUp);

  setupMap() {
    const { destinations } = this.props;
    this.map = renderMap("map");
    Promise.all(
      destinations.map(location => addMarker(location, this.map))
    ).then(markers =>
      this.setState({
        destinationsCoordinates: markers.map(
          (marker: MapglMarker) => marker._lngLat
        )
      })
    );
  }

  componentDidMount() {
    this.setupMap();
    this.registerEventListeners();
  }

  componentWillUnmount() {
    this.unregisterEventListeners();
  }

  zoomToBounds(start?: number, end?: number) {
    const { destinationsCoordinates } = this.state;
    const dcLength = destinationsCoordinates.length;
    const bounds = getBounds(
      destinationsCoordinates.slice(
        isNaN(start) ? 0 : Math.max(0, start),
        isNaN(end) ? dcLength : end
      )
    );
    this.map.fitBounds(
      [[bounds.sw.lng, bounds.sw.lat], [bounds.ne.lng, bounds.ne.lat]],
      { maxZoom: 24, padding: { top: 200, bottom: 200, left: 400, right: 400 } }
    );
  }

  showInitialView() {
    this.zoomToBounds();

    setTimeout(() => {
      this.setState({ displayMarkers: true });
      addRoute(this.map, this.state.destinationsCoordinates);
    }, 1500);
  }

  showNextDestination() {
    const { currentDestinationIndex } = this.props;
    const { destinationsCoordinates } = this.state;
    addSolidSegments(
      this.map,
      destinationsCoordinates.slice(0, currentDestinationIndex)
    );
    this.zoomToBounds(currentDestinationIndex - 1, currentDestinationIndex + 1);
    setTimeout(() => {
      addAnimatedSegment(
        this.map,
        destinationsCoordinates.slice(
          currentDestinationIndex - 1,
          currentDestinationIndex + 1
        )
      );
    }, 500);
  }

  componentDidUpdate(prevProps) {
    const { currentDestinationIndex } = this.props;
    if (currentDestinationIndex === 0) {
      this.showInitialView();
    } else if (currentDestinationIndex !== prevProps.currentDestinationIndex) {
      this.showNextDestination();
    }
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
