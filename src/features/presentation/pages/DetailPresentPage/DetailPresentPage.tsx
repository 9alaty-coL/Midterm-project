import { FC, memo, useEffect, useState } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

import style from "./DetailPresentPage.module.css";

import { PresentationApiService } from 'src/api/services/presentation-api';

import { EditSlide } from '../../components/DetailPresentPage/EditSlide/EditSlide';
import { ListSlide } from '../../components/DetailPresentPage/ListSlide/ListSlide';
import { PresentationNav } from "../../components/DetailPresentPage/PresentationNav/PresentationNav";

import { useQuery } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';
import { Presentation } from 'src/models/presentation';
import { DetailSlide } from '../../components/DetailSlide/DetailSlide';
import { Slide } from 'src/models/slide';
import { io, Socket } from 'socket.io-client';

export interface PresentationOutletProps {
    readonly presentation: Presentation;
    readonly nextSlideFn: () => void;
    readonly previousSlideFn: () => void;
}

const DetailPresentPageComponent: FC = () => {
    const { id } = useParams()
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        setSocket(io('http://localhost:8080'))
      }, [])

    const { isLoading, isError, data } = (id === undefined ?
        { isLoading: false, isError: false, data: {
            id: '1',
            name: 'New presentation',
            current: '1',
            slides: []
        }}:
        useQuery<Presentation>('getPresentationDetails', () => PresentationApiService.getPresentationById(id!))
    )

    useEffect(() => {
        socket?.emit("AddPresentation", id, null)
    
    }, [socket])

    useEffect(() => {
        if (data) {
            socket?.emit("ChangeSlide", data.current)
        }
    }, [socket, data])

    const [presentation, setPresentation] = useState<Presentation>({
        id: '123',
        name: '',
        current: '-1',
        slides: []
    })   

    const [currentSlide, setCurrentSlide] = useState(1)

    if (isLoading) {
        return <AppLoadingSpinner />
    }

    if (isError) {
        return <h1>Slide not found</h1>
    }

    if (data != null && presentation.current === '-1') {
        setPresentation(data)
    }

    const addSlide = () => {
        setPresentation({...presentation, slides: [...presentation.slides, {
            id: '123',
            question: 'New question?',
            answers: [
                {answer: 'Orange', count: 3},
                {answer: 'Blue', count: 2},
                {answer: 'Purple', count: 0},
                {answer: 'Yellow', count: 5}
            ]
        }]})
    }

    const editSlide = (index: number, newSlide: Slide) => {
        let slides = presentation.slides
        slides[index - 1] = newSlide

        setPresentation({...presentation, slides: slides})
    }

    const deleteSlide = (index: number) => {
        let slides = presentation.slides
        slides.splice(index - 1, 1)
        setPresentation({...presentation, slides: [...slides]})
        if (currentSlide >= index) setCurrentSlide(currentSlide - 1)
    }

    const previousSlideFn = () => {
        socket?.emit("ChangeSlide", id, data?.slides[currentSlide - 1].id)
        setCurrentSlide(currentSlide - 1)
    }

    const nextSlideFn = () => {
        socket?.emit("ChangeSlide", id, data?.slides[currentSlide + 1].id)
        setCurrentSlide(currentSlide + 1)
    }

    const slide = data?.slides[currentSlide - 1];

    return (
        <div className={style['detail-container']}>
            <Outlet context={{
                presentation,
                previousSlideFn,
                nextSlideFn,
            }}/>
            <PresentationNav isPublic={true} 
                nameControl={{value: presentation.name, setValue: (event: any) => setPresentation({...presentation, name: event.target.value})}}/>
            <div className={style['detail-wrapper']}>
                <ListSlide presentation={presentation} 
                    listControl={{
                        current: currentSlide, setCurrent: setCurrentSlide, 
                        addSlide: addSlide,
                        deleteSlide: deleteSlide
                            }}/>
                <DetailSlide slide={slide}/>
                <EditSlide editSlide={editSlide}/>
            </div>
        </div>
    )
}

export const DetailPresentPage = memo(DetailPresentPageComponent);
