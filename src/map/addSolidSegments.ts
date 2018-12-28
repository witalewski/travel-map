export const addSolidSegments: (map: MapglMap, coordsList: Coords[]) => void = (
  map,
  coordsList
) => {
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordsList.map(coords => [coords.lng, coords.lat])
    }
  };

  if (!map.getSource("solid-segments")) {
    map.addLayer({
      id: "solid-segments",
      type: "line",
      source: {
        type: "geojson",
        data: geojson
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#cb4b16",
        "line-width": 8,
        "line-opacity": 1
      }
    });
  } else {
    map.getSource("solid-segments").setData(geojson);
  }
};
