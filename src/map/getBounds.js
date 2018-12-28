export const getBounds = items => {
  const initialBounds = {
    sw: {
      lat: Infinity,
      lng: Infinity
    },
    ne: {
      lat: -Infinity,
      lng: -Infinity
    }
  };

  return items.reduce(
    (acc, item) => ({
      sw: {
        lat: Math.min(item.lat, acc.sw.lat),
        lng: Math.min(item.lng, acc.sw.lng)
      },
      ne: {
        lat: Math.max(item.lat, acc.ne.lat),
        lng: Math.max(item.lng, acc.ne.lng)
      }
    }),
    initialBounds
  );
};
