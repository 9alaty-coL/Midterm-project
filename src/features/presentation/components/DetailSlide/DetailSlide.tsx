import { FC, memo } from 'react';
import { Slide } from 'src/models/slide';
import { BarChart } from './chart-component/BarChart/BarChart';
import { DonutChart } from './chart-component/DonutChart/DonutChart';
import { PieChart } from './chart-component/PieChart/PieChart';

import style from "./DetailSlide.module.css";

interface Props {
  readonly slide: Slide | undefined;
}

const DetailSlideComponent: FC<Props> = ({ slide }) => {

  if (slide == null) {
    return <h1>Slide not found!</h1>
  }



  return <div className={style['detail-slide']}>
    <h1 className={style['detail-slide__title']}>{slide.question}</h1>
    <BarChart dataset={slide.answers.map(answer => ({
      label: answer.answer,
      count: answer.count,
    }))} />
    {/* <PieChart dataset={slide.answers.map(answer => ({
      label: answer.answer,
      count: answer.count,
    }))} /> */}
    {/* <DonutChart dataset={slide.answers.map(answer => ({
      label: answer.answer,
      count: answer.count,
    }))} /> */}
  </div>
}

export const DetailSlide = memo(DetailSlideComponent);
