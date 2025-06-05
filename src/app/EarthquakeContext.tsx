import { createContext, useContext, useState, ReactNode } from "react";

interface EarthquakeContextType {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

const EarthquakeContext = createContext<EarthquakeContextType | undefined>(undefined);

export const EarthquakeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <EarthquakeContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </EarthquakeContext.Provider>
  );
};

export const useEarthquake = () => {
  const context = useContext(EarthquakeContext);
  if (!context) {
    throw new Error("useEarthquake must be used within an EarthquakeProvider");
  }
  return context;
};