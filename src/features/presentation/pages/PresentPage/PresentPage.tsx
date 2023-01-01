import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@mui/material';
import { FC, memo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { DetailSlide } from '../../components/DetailSlide/DetailSlide';
import { PresentationOutletProps } from '../DetailPresentPage/DetailPresentPage';

import { ChatBox } from "../../components/PresentPage/ChatBox/ChatBox";
import { QuestionBox } from "../../components/PresentPage/QuestionBox/QuestionBox";

import style from "./PresentPage.module.css";

const PresentPageComponent: FC = () => {

  const { presentation, nextSlideFn, previousSlideFn, isChangingSlide } = useOutletContext<PresentationOutletProps>()

  const index = presentation.slides.findIndex(slide => slide.id === presentation.current)

  return <div className={style['presenting']}>
      <div className={style['presenting__slide_wrapper']}>
        <DetailSlide slide={presentation.slides.find(slide => slide.id === presentation.current)} />
        <Link className={style['presenting__exit']} to='..'>
          <FontAwesomeIcon icon={faX}/>
        </Link>
        <Fab className={style['presenting__previous']} color='primary'
          disabled={isChangingSlide || index === 0}
          onClick={previousSlideFn}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Fab>
        <Fab className={style['presenting__next']} color='primary'
          disabled={isChangingSlide || index === presentation.slides.length - 1}
          onClick={nextSlideFn}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Fab>        
      </div>
      <div className={style['presenting__box_wrapper']}>
        <ChatBox side="present"/>
        <QuestionBox side="present"/>
      </div>
  </div>
}

export const PresentPage = memo(PresentPageComponent);
