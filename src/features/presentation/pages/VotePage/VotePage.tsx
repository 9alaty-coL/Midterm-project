import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { PresentationApiService } from 'src/api/services/presentation-api';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { Presentation } from 'src/models/presentation';
import { io } from 'socket.io-client';

import styles from "./VotePage.module.css";
import { Socket } from 'socket.io-client/build/esm/socket';
import { Slide } from 'src/models/slide';

const VotePageComponent: FC = () => {
  const { id } = useParams();
  const data = useQuery<Presentation>('getPresentationJoin', PresentationApiService.getPresentationById.bind(null, id!))
  const [socket, setSocket] = useState<Socket>();
  const [detail, setDetail] = useState<Presentation>();

  useEffect(() => {
    setSocket(io('http://localhost:8080'))
  }, [])

  useEffect(() => {
    setDetail(data.data);
  }, [data.data])
  
  useEffect(() => {
    socket?.emit("AddStudent", id)
    socket?.on("ChangedSlide", (slideId: Slide['id']) => {
      console.log('New slide id: ', slideId)
      setDetail(prev => {
        if (prev) {
          return {
            ...prev,
            current: slideId,
          }
        }
        return prev;
      })
    })
  }, [socket])

  if (data.isLoading) {
    return <AppLoadingSpinner />;
  }
  
  if (data.isError || detail == null) {
    return <h1>Presentation not found</h1>
  }

  const slide = detail.slides.find(slide => slide.id === detail.current);

  if (slide == null) {
    return <h1>Slide not found</h1>
  }

  return <div className={styles['presentation']}>
    <div className={styles['presentation__name']}>{detail.name}</div>
    <span>current slide: {detail.current}</span>
    <FormControl>
      <FormLabel className={styles['presentation__question']} id="demo-radio-buttons-group-label">{slide.question}</FormLabel>
      <RadioGroup className={styles['presentation__options']}>
        {slide.answers.map((option, index) => 
        <FormControlLabel className={styles['presentation__option']} key={index} value={option.answer} control={<Radio />} label={option.answer} />)}
      </RadioGroup>
      <Button className={styles['presentation__button']} type='submit' variant='contained'>Submit</Button>
    </FormControl>
  </div>
}

export const VotePage = memo(VotePageComponent);