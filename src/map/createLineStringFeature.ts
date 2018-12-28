export const createLineStringFeature: (
  coordsList: number[][]
) => Geojson = coordsList => ({
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: coordsList
  }
});
