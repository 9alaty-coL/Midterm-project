import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress, Fab, IconButton } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DetailSlide } from '../../components/DetailSlide/DetailSlide';
import { PresentationOutletProps } from '../DetailPresentPage/DetailPresentPage';

import { ChatBox } from "../../components/PresentPage/ChatBox/ChatBox";
import { QuestionBox } from "../../components/PresentPage/QuestionBox/QuestionBox";

import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { PresentationApiService } from 'src/api/services/presentation-api';

import style from "./PresentPage.module.css";

const PresentPageComponent: FC = () => {
  const navigate = useNavigate()

  const { presentation, nextSlideFn, previousSlideFn, isChangingSlide } = useOutletContext<PresentationOutletProps>()

  const index = presentation.slides.findIndex(slide => slide.id === presentation.current)

  // Push presenting status
  const mutatePresenting = useMutation(PresentationApiService.stopPresent)
  useEffect(() => {
      if (mutatePresenting.isSuccess) {
          navigate('/presentation/edit/' + presentation.id)
      }
  }, [mutatePresenting.isSuccess]);

  return <div className={style['presenting']}>
      <div className={style['presenting__slide_wrapper']}>
        <DetailSlide slide={presentation.slides.find(slide => slide.id === presentation.current)} />
        <IconButton 
          className={style['presenting__exit']} 
          onClick={() => mutatePresenting.mutate(presentation.id)}>
          {!mutatePresenting.isLoading && <FontAwesomeIcon icon={faX}/>}
          {mutatePresenting.isLoading && <CircularProgress />}
        </IconButton>
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
        <ChatBox presentationId={presentation.id} side="present"/>
        <QuestionBox presentationId={presentation.id} side="present"/>
      </div>
  </div>
}

export const PresentPage = memo(PresentPageComponent);
