export const addRoute: (map: MapglMap, coordsList: Coords[]) => void = (
  map,
  coordsList
) => {
  console.log("addroute")
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordsList.map(coords => [coords.lng, coords.lat])
    }
  };

  if (!map.getSource("route")) {
    map.addLayer({
      id: "route",
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
        "line-opacity": 0.4
      }
    });
  } else {
    map.getSource("route").setData(geojson);
  }
};
