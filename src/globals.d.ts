declare const mapboxSdk, mapboxgl: any;

interface MapglMap {
  fitBounds: (bounds: number[][], options: any) => void;
}

interface AppState {
  showMarkers: boolean;
  locationCoords: any[];
  currentSlide: number;
  showPhoto: boolean;
  currentPhotoIndex: number;
  currentPhotoSource: string;
}

interface MapglMarker {
  _lngLat: {
    lng: number;
    lat: number;
  };
}
