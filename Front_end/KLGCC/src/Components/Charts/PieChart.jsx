import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const DEFAULT_COLORS = ["#f5a623", "#4fc3f7", "#2ecc71", "#e74c3c"];

const PieChartComp = ({ data, nameKey, valueKey, title, colors = DEFAULT_COLORS }) => (
  <div style={{ height: 260 }}>
    <h3 style={{ marginBottom: 12 }}>{title}</h3>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          nameKey={nameKey}
          dataKey={valueKey}
          label
          outerRadius="80%"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PieChartComp;
