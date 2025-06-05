import { create } from "zustand";
import { EarthquakeStore } from "../types";

export const useEarthquakeStore = create<EarthquakeStore>((set) => ({
    selectedId: null,
    setSelectedId: (id) => set({ selectedId: id }),
  }));