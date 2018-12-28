export const scaleBounds = (bounds, scale) => ({
  sw: {
    lat: bounds.sw.lat * scale,
    lng: bounds.sw.lng * scale
  },
  ne: {
    lat: bounds.ne.lat / scale,
    lng: bounds.ne.lng / scale
  }
});
