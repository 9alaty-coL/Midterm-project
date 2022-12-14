import { FC, memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Align,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Anchor } from 'chartjs-plugin-datalabels/types/options';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartOption, ChartProps } from '../chart-option';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const BarChartComponent: FC<ChartProps> = ({ dataset, colors }) => {
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        formatter: Math.round,
        anchor: "end" as Anchor,
        offset: -20,
        align: 'end' as Align,
      },
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const data = {
    labels: ['Answers'],
    datasets: dataset.map((option, index) => ({
      label: option.label,
      data: [option.count],
      backgroundColor: colors[index],
    })),
  };

  return <Bar options={options} data={data} />
}

export const BarChart = memo(BarChartComponent);
