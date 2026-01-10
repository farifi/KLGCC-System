import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LineChartComp = ({ data, xKey, yKey, title, lineColor = "#f5a623" }) => (
  <div style={{ width: "100%", height: 260, minHeight: 260, minWidth: 0, display: "flex", flexDirection: "column", flex: "0 0 auto" }}>
    <h3 style={{ marginBottom: 12, flexShrink: 0 }}>{title}</h3>
    <div style={{ width: "100%", flex: 1, minHeight: 0, minWidth: 0, position: "relative" }}>
      <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis dataKey={xKey} stroke="#555555" tick={{ fill: "#555555", fontSize: 12 }} />
        <YAxis stroke="#555555" tick={{ fill: "#555555", fontSize: 12 }} />
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke={lineColor} strokeWidth={3} dot={false} />
      </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default LineChartComp;