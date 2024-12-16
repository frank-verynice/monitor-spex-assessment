import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DataChart({ data, rowsPerPage = 10, currentPage = 1, isRealTime = false }) {
  const [chartData, setChartData] = useState([]);

  // Prepare chart data for the current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    if (isRealTime) {
      const latestData = data.slice(-rowsPerPage).map((item) => ({
        timestamp: new Date(item.timestamp).toLocaleTimeString(),
        frequency: (item.frequency / 10).toFixed(2), // Example transformation
        signalStrength: item.signalStrength.toFixed(2),
      }));
      setChartData(latestData);
    }
    else {
      const paginatedData = data.slice(startIndex, endIndex).map((entry) => ({
        timestamp: new Date(entry.timestamp).toLocaleTimeString(),
        frequency: (entry.frequency / 10).toFixed(2), // Example transformation
        signalStrength: entry.signalStrength.toFixed(2),
      }));
      setChartData(paginatedData);
    }
  }, [currentPage, rowsPerPage, data]);

  return (
    <div className='ml-[-32px] md:ml-4'>
      <h2 className='hidden md:block'>Real-Time Data Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="frequency" stroke="#8884d8" name="Frequency/10 (Hz)" isAnimationActive={false} />
          <Line type="monotone" dataKey="signalStrength" stroke="#82ca9d" name="Signal Strength (%)" isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DataChart;
