export interface Earthquake {
    id: string;
    time: string;
    latitude: number;
    longitude: number;
    depth: number;
    mag: number;
    place: string;
  }

  export interface EarthquakeStore {
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
  }