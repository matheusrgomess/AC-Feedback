import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useColorMode } from "@chakra-ui/react";

export default function CartesianChart() {
  const { colorMode } = useColorMode();
  const data = [
    {
      name: "Sprint 1",
      uv: 400,
      pv: 240,
      amt: 2400,
    },
    {
      name: "Sprint 2",
      uv: 300,
      pv: 138,
      amt: 220,
    },
    {
      name: "Sprint 3",
      uv: 200,
      pv: 480,
      amt: 229,
    },
    {
      name: "Sprint 4",
      uv: 278,
      pv: 528,
      amt: 200,
    },
    {
      name: "Sprint 5",
      uv: 189,
      pv: 400,
      amt: 218,
    },
    {
      name: "Sprint 6",
      uv: 239,
      pv: 380,
      amt: 250,
    },
    {
      name: "Sprint 7",
      uv: 349,
      pv: 430,
      amt: 210,
    },
  ];

  return (
    <ResponsiveContainer width="120%" height="100%">
      <LineChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#971520"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke={colorMode === "dark" ? "white" : "black"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
