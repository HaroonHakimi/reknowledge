"use client";
import { useEffect, useState } from "react";
import { Earthquake } from "@/lib/types";
import {
  EarthquakeChart,
} from "@/components/chart/EarthquakeChart";
import { EarthquakeTable } from "@/components/table/EarthquakeTable";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEarthquakeStore } from "@/lib/stores/earthquakeStore";
import { EarthquakeProvider } from "./EarthquakeContext";

export default function Home() {
  const [data, setData] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [xAxis, setXAxis] = useState("longitude");
  const [yAxis, setYAxis] = useState("latitude");
  const { setSelectedId } = useEarthquakeStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"
        );
        const text = await response.text();
        const lines = text.split("\n").slice(1); // Skip header
        const parsedData = lines
          .filter((line) => line.trim())
          .map((line) => {
            const [
              time,
              latitude,
              longitude,
              depth,
              mag,
              ,
              ,
              ,
              ,
              ,
              ,
              ,
              ,
              id,
              ,
              place,
            ] = line.split(",");
            return {
              id: `${id}-${time}`,
              time,
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              depth: parseFloat(depth),
              mag: parseFloat(mag),
              place,
            };
          });
        setData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
        {!show ? (
          <div 
            
            style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", height: "100vh", padding: "5rem" }}
          >
            <h1 
              
              style={{ fontSize: "8rem", letterSpacing: "-0.05em", display: "flex", flexDirection: "column" }}
            >
              Start your journey with{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Earthquake Visualization
              </span>{" "}
            </h1>
            <div
              
            >
              <Button 
                className="mt-10 text-2xl p-6 flex justify-center items-center cursor-pointer"
                onClick={() => setShow(true)}
              >
                Let&apos;s go <ArrowRight />
              </Button>
            </div>
          </div>
        ) : (
          
            <EarthquakeProvider>
              <div className="container mx-auto p-4 ">
                <h1 className="text-2xl font-bold mb-4">
                  Earthquake Visualization
                </h1>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="lg:w-1/2">
                    <div className="mb-4">
                      <label className="mr-2">X-Axis:</label>
                      <select
                        value={xAxis}
                        onChange={(e) => setXAxis(e.target.value)}
                        className="border p-1"
                      >
                        <option value="longitude">Longitude</option>
                        <option value="latitude">Latitude</option>
                        <option value="depth">Depth</option>
                        <option value="mag">Magnitude</option>
                      </select>
                      <label className="ml-4 mr-2">Y-Axis:</label>
                      <select
                        value={yAxis}
                        onChange={(e) => setYAxis(e.target.value)}
                        className="border p-1"
                      >
                        <option value="latitude">Latitude</option>
                        <option value="longitude">Longitude</option>
                        <option value="depth">Depth</option>
                        <option value="mag">Magnitude</option>
                      </select>
                    </div>
                    <EarthquakeChart
                      data={data}
                      xAxis={xAxis}
                      yAxis={yAxis}
                      setSelectedId={setSelectedId}
                    />
                  </div>
                  <div className="lg:w-1/2">
                    <EarthquakeTable data={data} setSelectedId={setSelectedId} />
                  </div>
                </div>
              </div>
            </EarthquakeProvider>
        )}
    </div>
  );
}
