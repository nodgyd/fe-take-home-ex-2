// components/CurrencyChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, TimeScale } from 'chart.js';

interface CurrencyChartProps {
  data: { time: number, value: number }[];
  name: string;
}

const CurrencyChart: React.FC<CurrencyChartProps> = ({ data, name }) => {
  const chartData: ChartData<'line'> = {
    labels: data.map((d) => new Date(d.time).toLocaleTimeString()),
    datasets: [
      {
        label: name,
        data: data.map((d) => d.value),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };


  return <Line data={chartData} />;
};

export default CurrencyChart;
