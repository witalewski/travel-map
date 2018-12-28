declare module "*";
declare const mapboxSdk, mapboxgl: any;

interface MapglMap {
  fitBounds: (bounds: number[][], options: any) => void;
  getSource: any;
  addLayer: any;
}

interface Destination {
  name: string;
  photos?: string[];
  coords?: Coords;
}

interface AppState {
  destinations: Destination[];
  currentDestinationIndex: number;
  currentDestination: Destination;
  currentPhotoIndex: number;
  currentPhoto: string;
  displayPhoto: boolean;
  displayMarkers: boolean;
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
