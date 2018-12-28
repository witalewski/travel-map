import { getAccessToken } from "./getAccessToken";

export const renderMap = elementId => {
  mapboxgl.accessToken = getAccessToken();
  const map = new mapboxgl.Map({
    container: elementId,
    style: "mapbox://styles/witalewski/cjq7ug58g0nl92rl6ms777xc1",
    center: [0, 0],
    zoom: 1,
    minZoom: 0,
    maxZoom: 24
  });
  return map;
};
