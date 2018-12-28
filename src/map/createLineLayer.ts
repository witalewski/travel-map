export const createLineLayer: (
  id: string,
  geojson: Geojson,
  opacity: number
) => MapLayer = (id, geojson, opacity) => ({
  id,
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
    "line-opacity": opacity
  }
});
