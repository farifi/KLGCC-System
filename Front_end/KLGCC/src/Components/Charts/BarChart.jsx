import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BarChartComp = ({ data, xKey, yKey, title }) => (
  <div style={{ height: 300 }}>
    <h3>{title}</h3>
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChartComp;