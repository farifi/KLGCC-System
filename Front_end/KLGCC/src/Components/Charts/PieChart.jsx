import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComp = ({ data, nameKey, valueKey, title }) => (
  <div style={{ height: 300 }}>
    <h3>{title}</h3>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          nameKey={nameKey}
          dataKey={valueKey}
          label
>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PieChartComp;
