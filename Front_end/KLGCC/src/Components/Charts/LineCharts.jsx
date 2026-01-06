import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LineChartComp = ({ data, xKey, yKey, title, lineColor = "#f5a623" }) => (
  <div style={{ height: 260 }}>
    <h3 style={{ marginBottom: 12 }}>{title}</h3>
    <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis dataKey={xKey} stroke="#555555" tick={{ fill: "#555555", fontSize: 12 }} />
        <YAxis stroke="#555555" tick={{ fill: "#555555", fontSize: 12 }} />
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke={lineColor} strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default LineChartComp;