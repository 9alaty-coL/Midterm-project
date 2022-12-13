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
import { useSnackbar } from 'notistack';

export interface PresentationOutletProps {
    readonly presentation: Presentation;
    readonly nextSlideFn: () => void;
    readonly previousSlideFn: () => void;
    readonly isChangingSlide: boolean;
}

const DetailPresentPageComponent: FC = () => {
    const { id } = useParams()
    const [socket, setSocket] = useState<Socket>();
    const [isChangingSlide, setIsChangingSlide] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar()
    const [presentation, setPresentation] = useState<Presentation>({
        id: '123',
        name: '',
        current: '-1',
        slides: []
    })
    useEffect(() => {
        setSocket(io('https://dnlearning-socket-server.onrender.com',  {transports: ['websocket']}))
      }, [])



    const { isLoading, isError, data } = useQuery<Presentation>(['getPresentationDetails', id], () => PresentationApiService.getPresentationById(id!))

    useEffect(() => {
        socket?.emit("AddPresentation", id, null)
        socket?.on("AnsweredQuestion", answerId => {
            setPresentation(prev => {
                const newPresentation = JSON.parse(JSON.stringify(prev)) as Presentation
                const current = newPresentation.slides.find(s => s.id === prev.current)
                if (current == null) {
                    return prev;
                }
                current.answers.forEach(each => {
                    if (each.id === answerId) {
                        each.count ++;
                    }
                })
                return newPresentation;
            })
        })
    }, [socket])

    useEffect(() => {
        if (data) {
            socket?.emit("ChangeSlide", data.current)
        }
    }, [socket, data])



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

    const slide = presentation.slides[currentSlide - 1];

    const addSlide = () => {
        setPresentation({...presentation, slides: [...presentation.slides, {
            id: '123',
            question: 'New question?',
            answers: [
                {id: '123', answer: 'Orange', count: 3},
                {id: '123', answer: 'Blue', count: 2},
                {id: '123', answer: 'Purple', count: 0},
                {id: '123', answer: 'Yellow', count: 5}
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

    const changeSlide = (newSlideId: Slide['id']): Promise<Presentation> => {
        setIsChangingSlide(true);
        return PresentationApiService.changePresentationSlide(newSlideId, presentation.id);
    }

    const previousSlideFn = () => {
        const currentSlideIndex = presentation.slides.findIndex(s => s.id === presentation.current)
        if (currentSlideIndex === -1) {
            return;
        }
        const newSlideId = presentation.slides[currentSlideIndex - 1].id;
        changeSlide(newSlideId).then(newPresentation => {
            setIsChangingSlide(false)
            setPresentation(newPresentation)
            socket?.emit("ChangeSlide", id, presentation.slides[currentSlideIndex - 1].id)
        }).catch(() => {
            enqueueSnackbar('Something went wrong. Please try again!')
            setIsChangingSlide(false)
        })
    }

    const nextSlideFn = () => {
        const currentSlideIndex = presentation.slides.findIndex(s => s.id === presentation.current)
        if (currentSlideIndex === -1) {
            return;
        }
        const newSlideId = presentation.slides[currentSlideIndex + 1].id;
        changeSlide(newSlideId).then(newPresentation => {
            setIsChangingSlide(false)
            setPresentation(newPresentation)
            socket?.emit("ChangeSlide", id, presentation.slides[currentSlideIndex + 1].id)
        }).catch(() => {
            enqueueSnackbar('Something went wrong. Please try again!')
            setIsChangingSlide(false)
        })
    }

    return (
        <div className={style['detail-container']}>
            <Outlet context={{
                presentation,
                previousSlideFn,
                nextSlideFn,
                isChangingSlide,
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
                <div className={style['detail-slide']}>
                  <DetailSlide slide={slide}/>
                </div>
                <EditSlide editSlide={editSlide}/>
            </div>
        </div>
    )
}

export const DetailPresentPage = memo(DetailPresentPageComponent);
