import { getAccessToken } from "./getAccessToken";
import { isImage } from "../media/mediaType";
import { mapElementsColor } from "../theme/theme";

const getMarkerIcon = location => {
  const markerElement = document.createElement("div");
  markerElement.className = "marker";
  markerElement.style.backgroundColor = mapElementsColor;
  if (location.media) {
    const image = location.media.find(isImage);
    if (image) {
      markerElement.style.backgroundImage = `url(${image})`;
    }
  }

  const labelElement = document.createElement("div");
  labelElement.className = "label";
  labelElement.innerText = location.name;
  markerElement.appendChild(labelElement);

  return markerElement;
};

export const addMarker: (
  location: any,
  map: MapglMap
) => Promise<MapglMarker> = (location, map) =>
  new Promise(resolve => {
    const mapboxClient = mapboxSdk({ accessToken: getAccessToken() });
    mapboxClient.geocoding
      .forwardGeocode({
        query: location.name,
        autocomplete: false,
        limit: 1
      })
      .send()
      .then(function(response) {
        if (
          response &&
          response.body &&
          response.body.features &&
          response.body.features.length
        ) {
          var feature = response.body.features[0];
          const marker = new mapboxgl.Marker(getMarkerIcon(location))
            .setLngLat(feature.center)
            .addTo(map);
          resolve(marker);
        }
      });
  });
