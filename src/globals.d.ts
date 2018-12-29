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
  previousState: AppState;
  destinations: Destination[];
  currentDestinationIndex: number;
  currentDestination: Destination;
  currentPhotoIndex: number;
  currentPhoto: string;
  displayPhoto: boolean;
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
  _pos: {
    x: number;
    y: number;
  };
  _element:HTMLElement;
}

interface Geojson {
  type: string;
  properties: {};
  geometry: {
    type: string;
    coordinates: number[][];
  };
}

interface MapLayer {
  id: string;
  type: string;
  source: {
    type: string;
    data: Geojson;
  };
  layout: {
    "line-join": string;
    "line-cap": string;
  };
  paint: {
    "line-color": string;
    "line-width": number;
    "line-opacity": number;
  };
}
