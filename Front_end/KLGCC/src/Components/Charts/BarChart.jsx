import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BarChartComp = ({ data, xKey, yKey, title, barColor = "#4fc3f7" }) => (
  <div style={{ width: "100%", height: 260 }}>
    <h3 style={{ marginBottom: 12 }}>{title}</h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey={xKey} stroke="#555555" tick={{ fill: "#555555", fontSize: 12 }} />
        <YAxis stroke="#555555" tick={{ fill: "#555555", fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey={yKey} fill={barColor} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChartComp;