import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function StockChart({ data }) {
  return (
    <div className="chart-container">
      <h3>Stock Levels</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#2ecc71" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;