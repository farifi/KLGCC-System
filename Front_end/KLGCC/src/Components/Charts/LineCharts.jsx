import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LineChartComp = ({ data, xKey, yKey, title }) => (
  <div style={{ height: 300 }}>
    <h3>{title}</h3>
    <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default LineChartComp;