import { FC, memo } from 'react';
import { ChartProps } from '../chart-option';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import style from './DonutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartComponent: FC<ChartProps> = ({ dataset }) => {

  const data = {
    labels: dataset.map(option => option.label),
    datasets: [
      {
        label: 'Answers',
        data: dataset.map(option => option.count),
        backgroundColor: dataset.map(() => `rgba(${Math.random() * 210}, ${Math.random() * 210}, ${Math.random() * 210}, 0.7)`),
        borderWidth: 1,
      },
    ],
  };

  return <div className={style['donut-chart']}>
    <Doughnut data={data} />
  </div>;
}

export const DonutChart = memo(DonutChartComponent);
