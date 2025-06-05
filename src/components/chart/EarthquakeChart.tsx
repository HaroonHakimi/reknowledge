import { Earthquake} from "@/lib/types";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { useEarthquakeStore } from "@/lib/stores/earthquakeStore";
import { ScatterPointItem } from "recharts/types/cartesian/Scatter";

export const EarthquakeChart: React.FC<{
    data: Earthquake[];
    xAxis: string;
    yAxis: string;
    setSelectedId: (id: string | null) => void;
  }> = ({ data, xAxis, yAxis, setSelectedId }) => {
    const { selectedId } = useEarthquakeStore();
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey={xAxis}
            name={xAxis}
            domain={["auto", "auto"]}
          />
          <YAxis
            type="number"
            dataKey={yAxis}
            name={yAxis}
            domain={["auto", "auto"]}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            name="Earthquakes"
            data={data}
            fill="#8884d8"
            onClick={(point: Earthquake) => setSelectedId(point.id)}
            shape={(props: ScatterPointItem) => {
              const isSelected = props.payload.id === selectedId;
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={isSelected ? 8 : 5}
                  fill={isSelected ? "#ff7300" : "#8884d8"}
                  onMouseEnter={() => setSelectedId(props.payload.id)}
                  onMouseLeave={() => setSelectedId(null)}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    );
  };