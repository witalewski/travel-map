export const addRoute = (map, coordsList) => {
  map.addLayer({
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordsList.map(coords => [coords.lng, coords.lat])
        }
      }
    },
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "#cb4b16",
      "line-width": 8,
      "line-opacity": 0.4
    }
  });
};
