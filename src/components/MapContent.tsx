import * as React from "react";
import {
  renderMap,
  addMarker,
  addAnimatedSegment,
  addRoute,
  addSolidSegments,
  fitBounds,
  adjustMarkerLabels
} from "../map";

export class MapContent extends React.Component<
  {
    destinations: Destination[];
    currentDestinationIndex: number;
  },
  { displayMarkers: Boolean; destinationsCoordinates: Coords[] }
> {
  state = {
    displayMarkers: false,
    destinationsCoordinates: []
  };

  map: MapglMap;

  componentDidMount() {
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
    return (
      <div
        className={this.state.displayMarkers ? "map-container" : "map-container--hide-markers"}
        id="map"
      />
    );
  }
}
