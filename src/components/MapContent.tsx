import * as React from "react";
import { useMapContent } from "./useMapContent";

export const MapContent = ({
  destinations,
  currentDestinationIndex,
}: {
  destinations: Destination[];
  currentDestinationIndex: number;
}) => {
  const { displayMarkers } = useMapContent(
    destinations,
    currentDestinationIndex
  );
  return (
    <div
      className={
        displayMarkers ? "map-container" : "map-container--hide-markers"
      }
      id="map"
    />
  );
};
