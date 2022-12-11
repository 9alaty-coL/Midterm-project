import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@mui/material';
import { FC, memo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { DetailSlide } from '../../components/DetailSlide/DetailSlide';
import { PresentationOutletProps } from '../DetailPresentPage/DetailPresentPage';
import style from "./PresentPage.module.css";

const PresentPageComponent: FC = () => {

  const { presentation, nextSlideFn, previousSlideFn } = useOutletContext<PresentationOutletProps>()

  const index = presentation.slides.findIndex(slide => slide.id === presentation.current)

  return <div className={style['presenting']}>
    <Link className={style['presenting__exit']} to='..'>
      <FontAwesomeIcon icon={faX}/>
    </Link>
    <Fab className={style['presenting__previous']} color='primary'
      disabled={index === 0}
      onClick={previousSlideFn}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </Fab>
    <Fab className={style['presenting__next']} color='primary'
      disabled={index === presentation.slides.length - 1}
      onClick={nextSlideFn}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </Fab>
    <div className={style['presenting__container']}>
      <div className={style['presenting__content']}>
        <DetailSlide slide={presentation.slides.find(slide => slide.id === presentation.current)} />
      </div>
    </div>
  </div>
}

export const PresentPage = memo(PresentPageComponent);
