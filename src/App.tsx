import * as React from "react";
import { connect } from "react-redux";

import {
  renderMap,
  addMarker,
  addAnimatedSegment,
  addRoute,
  addSolidSegments,
  fitBounds,
  adjustMarkerLabels
} from "./map";
import { isImage, isVideo } from "./media/mediaType.ts";
import { next, prev } from "./state/actions";

export class App extends React.Component<
  {
    destinations: Destination[];
    currentDestinationIndex: number;
    currentMedia: string;
    displayMedia: boolean;
    next: () => void;
    prev: () => void;
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
    } else if (code === "ArrowLeft") {
      this.props.prev();
    }
  };

  setupMap() {
    const { destinations } = this.props;
    this.map = renderMap("map");
    Promise.all(
      destinations.map(location => addMarker(location, this.map))
    ).then(markers => {
      adjustMarkerLabels(markers);
      this.setState({
        destinationsCoordinates: markers.map(
          (marker: MapglMarker) => marker._lngLat
        )
      });
    });
  }

  componentDidMount() {
    this.setupMap();
    document.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.onKeyUp);
  }

  zoomToBounds(start?: number, end?: number) {
    fitBounds(this.map, this.state.destinationsCoordinates, start, end);
  }

  showInitialView() {
    this.zoomToBounds();

    setTimeout(() => {
      this.setState({ displayMarkers: true });
      addRoute(this.map, this.state.destinationsCoordinates);
    }, 1500);
  }

  updateDestination(reverseAnimation: boolean) {
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
        ),
        reverseAnimation
      );
    }, 500);
  }

  componentDidUpdate(prevProps) {
    const { currentDestinationIndex } = this.props;
    if (currentDestinationIndex === 0) {
      this.showInitialView();
    } else if (currentDestinationIndex !== prevProps.currentDestinationIndex) {
      this.updateDestination(
        currentDestinationIndex < prevProps.currentDestinationIndex
      );
    }
  }

  render() {
    const { displayMedia, currentMedia } = this.props;
    return (
      <main
        className={`main ${
          this.state.displayMarkers ? "" : "main--hide-markers"
        }`}
      >
        <div id="map" />
        {displayMedia && isImage(currentMedia) && (
          <img className="photo" src={currentMedia} />
        )}
        {displayMedia && isVideo(currentMedia) && (
          <video className="video" autoPlay controls>
            <source src={currentMedia} />
          </video>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  destinations: state.destinations,
  currentDestinationIndex: state.currentDestinationIndex,
  currentMedia: state.currentMedia,
  displayMedia: state.displayMedia
});
const mapDispatchToProps = {
  next,
  prev
};

export const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
