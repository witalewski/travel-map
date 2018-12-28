declare module "*";
declare const mapboxSdk, mapboxgl: any;

interface MapglMap {
  fitBounds: (bounds: number[][], options: any) => void;
  getSource: any;
  addLayer: any;
}

interface Location {
  name: string;
  photos?: string[];
}

interface AppState {
  displayMarkers: boolean;
  locationCoords: any[];
  currentSlide: number;
  displayPhoto: boolean;
  currentPhotoIndex: number;
  currentPhotoSource: string;
  travelMap: Location[];
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
