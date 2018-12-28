export const interpolateLine = (p1, p2, steps) => {
  const xstep = (p2.lng - p1.lng) / steps;
  const ystep = (p2.lat - p1.lat) / steps;

  const intermediatePoints = [];

  for (let s = 0; s < steps; s++) {
    intermediatePoints.push([p1.lng + xstep * s, p1.lat + ystep * s]);
  }

  return [[p1.lng, p1.lat], ...intermediatePoints, [p2.lng, p2.lat]];
};
