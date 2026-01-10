import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComp = ({ data, nameKey, valueKey, title, colors = COLORS }) => (
  <div style={{ width: "100%", height: 300, minHeight: 300, minWidth: 0, display: "flex", flexDirection: "column", flex: "0 0 auto" }}>
    <h3 style={{ marginBottom: 12, flexShrink: 0 }}>{title}</h3>
    <div style={{ width: "100%", flex: 1, minHeight: 0, minWidth: 0, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          nameKey={nameKey}
          dataKey={valueKey}
          label
          >
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PieChartComp;
