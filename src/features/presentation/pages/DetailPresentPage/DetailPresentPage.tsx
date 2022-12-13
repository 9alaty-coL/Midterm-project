import { FC, memo, useEffect, useState } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

import style from "./DetailPresentPage.module.css";

import { useChangeSlides } from "../../components/DetailPresentPage/useChangeSlides"

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
    const { isLoading, isError, data } = useQuery<Presentation>('getPresentationDetails', () => PresentationApiService.getPresentationById(id!))

    // Socket
    useEffect(() => {
        setSocket(io('https://dnlearning-socket-server.onrender.com',  {transports: ['websocket']}))
    }, [])
    
    useEffect(() => {
        socket?.emit("AddPresentation", id, null)
    }, [socket])

    useEffect(() => {
        if (data) {
            socket?.emit("ChangeSlide", data.current)
        }
    }, [socket, data])

    // Data state
    const [presentation, setPresentation] = useState<Presentation>({
        id: '123',
        name: '',
        current: '-1',
        slides: []
    })   

    const slidesControl = useChangeSlides(presentation.slides)

    // Check loading state
    if (isLoading) {
        return <AppLoadingSpinner />
    }

    if (isError) {
        return <h1>Slide not found</h1>
    }

    if (data != null && presentation.current === '-1') {
        setPresentation(data)
        slidesControl.initNewSlide(data.slides)
    }

    // Move function
    const previousSlideFn = () => {
        socket?.emit("ChangeSlide", id, presentation.slides[slidesControl.currentIndex.number - 1].id)
        setPresentation(prev => ({
            ...prev,
            current: presentation.slides[slidesControl.currentIndex.number - 1].id,
        }))
        slidesControl.currentIndex.setSlide(slidesControl.currentIndex.number - 1)
    }

    const nextSlideFn = () => {
        socket?.emit("ChangeSlide", id, presentation.slides[slidesControl.currentIndex.number + 1].id)
        setPresentation(prev => ({
            ...prev,
            current: presentation.slides[slidesControl.currentIndex.number + 1].id,
        }))
        slidesControl.currentIndex.setSlide(slidesControl.currentIndex.number + 1)
    }

    const slide = slidesControl.currentSlide

    // Component
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
                <ListSlide slidesControl={slidesControl} />
                <DetailSlide slide={slide}/>
                <EditSlide slidesControl={slidesControl} />
            </div>
        </div>
    )
}

export const DetailPresentPage = memo(DetailPresentPageComponent);
