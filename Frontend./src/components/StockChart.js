import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

function StockChart({ history, average }) {
  const data = history.map(item => ({
    time: new Date(item.lastUpdatedAt).toLocaleTimeString(),
    price: item.price
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#1976d2" />
        <ReferenceLine y={average} label="Avg" stroke="red" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StockChart;
