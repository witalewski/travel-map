import { useEffect, useRef, useState } from "react";

import {
  renderMap,
  addMarker,
  addAnimatedSegment,
  addRoute,
  addSolidSegments,
  fitBounds,
  adjustMarkerLabels,
} from "../map";

export const useMapContent = (
  destinations,
  currentDestinationIndex: number
) => {
  const [displayMarkers, setDisplayMarkers] = useState(false);
  const [destinationsCoordinates, setDestinationCoordinates] = useState<
    Coords[]
  >([]);

  const map = useRef<MapglMap>();
  const previousDestinationIndex = useRef(currentDestinationIndex);

  const zoomToBounds = (start?: number, end?: number) => {
    if (destinationsCoordinates.length) {
      fitBounds(map.current, destinationsCoordinates, start, end);
    }
  };

  const showInitialView = () => {
    try {
      setDisplayMarkers(true);
      addRoute(map.current, destinationsCoordinates);
    } catch (e) {
      if (e.message === "Style is not done loading") {
        setTimeout(showInitialView, 1500);
      }
    }
  };

  const updateDestination = (reverseAnimation: boolean) => {
    addSolidSegments(
      map.current,
      destinationsCoordinates.slice(0, currentDestinationIndex)
    );
    zoomToBounds(currentDestinationIndex - 1, currentDestinationIndex + 1);
    setTimeout(() => {
      addAnimatedSegment(
        map.current,
        destinationsCoordinates.slice(
          currentDestinationIndex - 1,
          currentDestinationIndex + 1
        ),
        reverseAnimation
      );
    }, 500);
  };

  useEffect(() => {
    map.current = renderMap("map");
    Promise.all(
      destinations.map((location) => addMarker(location, map.current))
    ).then((markers) => {
      adjustMarkerLabels(markers);

      setDestinationCoordinates(
        markers.map((marker: MapglMarker) => marker._lngLat)
      );
    });
  }, []);

  useEffect(() => {
    if (!destinationsCoordinates.length) {
      return;
    }

    if (currentDestinationIndex === 0) {
      zoomToBounds();
      showInitialView();
    } else if (currentDestinationIndex) {
      updateDestination(
        currentDestinationIndex < previousDestinationIndex.current
      );
      previousDestinationIndex.current = currentDestinationIndex;
    }
  }, [currentDestinationIndex, destinationsCoordinates]);

  return { displayMarkers };
};
