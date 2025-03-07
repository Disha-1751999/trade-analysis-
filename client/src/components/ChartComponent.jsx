import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";
import TradeStore from "@/store/TradeStore";

const ChartComponent = () => {
  const { TradeList } = TradeStore();
  const [selectedTradeCode, setSelectedTradeCode] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const tradeCodes = TradeList
    ? [...new Set(TradeList.map((item) => item.trade_code))]
    : [];

  useEffect(() => {
    if (tradeCodes.length > 0 && !selectedTradeCode) {
      setSelectedTradeCode(tradeCodes[0]);
    }
  }, [tradeCodes, selectedTradeCode]);

  useEffect(() => {
    if (selectedTradeCode && TradeList) {
      const sortedData = TradeList.filter(
        (item) => item.trade_code === selectedTradeCode && item.volume
      )
        .map((item) => ({
          ...item,
          volume: Number(item.volume.replace(/,/g, "")) || 0,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredData(sortedData);
    }
  }, [selectedTradeCode, TradeList]);

  return (
    <div className="w-full p-4 bg-white rounded-lg">
      <label className="block mb-2 text-sm font-medium">
        Select Trade Code:
      </label>
      <select
        className="mb-6 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-gray-800/90 text-primary-foreground shadow hover:bg-primary/80"
        value={selectedTradeCode || ""}
        onChange={(e) => setSelectedTradeCode(e.target.value)}
      >
        {tradeCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>

      {filteredData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="right" dataKey="volume" fill="#82ca9d" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartComponent;
