import { FC, memo } from 'react';
import { Slide } from 'src/models/slide';
import { BarChart } from './chart-component/BarChart/BarChart';
import { DonutChart } from './chart-component/DonutChart/DonutChart';
import { PieChart } from './chart-component/PieChart/PieChart';

import style from "./DetailSlide.module.css";

const colors = Array.from({ length: 100 }, (_, i) => `rgba(${Math.random() * 210}, ${Math.random() * 210}, ${Math.random() * 210}, 0.7)`)

interface Props {
  readonly slide: Slide | undefined;
}

const DetailSlideComponent: FC<Props> = ({ slide }) => {

  if (slide == null) {
    return <h1>Slide not found!</h1>
  }

  return <div className={style['detail-slide']}>
    <h1 className={style['detail-slide__title']}>{slide.question}</h1>
    {
      slide.chartType === 'donut' ? <DonutChart colors={colors} dataset={slide.answers.map(answer => ({
        label: answer.answer,
        count: answer.count,
        colors,
      }))} /> : slide.chartType === 'pie' ? <PieChart colors={colors} dataset={slide.answers.map(answer => ({
        label: answer.answer,
        count: answer.count,
        colors,
      }))} /> : <BarChart colors={colors} dataset={slide.answers.map(answer => ({
        label: answer.answer,
        count: answer.count,
        colors,
      }))} />
    }

  </div>
}

export const DetailSlide = DetailSlideComponent;
