// components/CurrencyChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, ChartData, BarElement, CategoryScale, Title, LinearScale } from 'chart.js';

Chart.register(BarElement, CategoryScale, Title, LinearScale);

interface CurrencyChartProps {
  data: { time: number, value: number }[];
  name: string;
}

const CurrencyChart: React.FC<CurrencyChartProps> = ({ data, name }) => {
  const chartData: ChartData<'bar'> = {
    labels: data.map((d) => new Date(d.time).toLocaleTimeString()),
    datasets: [
      {
        label: name,
        data: data.map((d) => d.value),
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#2c9faf',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: name
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default CurrencyChart;