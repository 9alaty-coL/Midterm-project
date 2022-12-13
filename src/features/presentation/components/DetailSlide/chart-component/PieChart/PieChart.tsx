import { FC, memo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartProps } from '../chart-option';
import style from './PieChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChartComponent: FC<ChartProps> = ({ dataset }) => {
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
  return <div className={style['pie-chart']}>
    <Pie data={data} />
  </div>;
}

export const PieChart = memo(PieChartComponent)
