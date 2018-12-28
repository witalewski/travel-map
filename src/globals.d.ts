declare const mapboxSdk, mapboxgl: any;

interface MapglMap {
  fitBounds: (bounds: number[][], options: any) => void;
  getSource: any;
  addLayer: any;
}

interface AppState {
  showMarkers: boolean;
  locationCoords: any[];
  currentSlide: number;
  showPhoto: boolean;
  currentPhotoIndex: number;
  currentPhotoSource: string;
}

interface Coords {
  lng: number;
  lat: number;
}

interface Bounds {
  sw: Coords;
  ne: Coords;
}

interface MapglMarker {
  _lngLat: Coords;
}
