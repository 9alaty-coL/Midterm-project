import { FC, memo } from 'react';
import { Slide } from 'src/models/slide';

import style from "./DetailSlide.module.css";

interface Props {
  readonly slide: Slide | undefined; 
}

const DetailSlideComponent: FC<Props> = ({ slide }) => {

  if (slide == null) {
    return <h1>Slide not found!</h1>
  }

  return <div className={style['detail-slide']}>
    {slide.answers.map((answer, index) => <div key={index} className={style['detail-slide__answer']}>
      <div>{answer.answer}</div>
      <div>{answer.count}</div>
    </div>)}
  </div>
}

export const DetailSlide = memo(DetailSlideComponent);