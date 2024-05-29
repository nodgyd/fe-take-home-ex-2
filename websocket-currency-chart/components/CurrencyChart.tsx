// components/CurrencyChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

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

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CurrencyChart;
