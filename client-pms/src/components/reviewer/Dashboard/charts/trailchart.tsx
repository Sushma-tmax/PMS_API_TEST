import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    uv: 60,
    pv: 50,
  },
  {
    uv: 70,
    pv: 90,
  },
  {
    uv: 250,
    pv: 230,
  },
  {
    uv: 80,
    pv: 90,
  },
  {
    uv: 40,
    pv: 30,
  },
];

export default function TrailChart() {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 15,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="1" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}
