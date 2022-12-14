import { FC, memo, useEffect, useState } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

import style from "./DetailPresentPage.module.css";

import { useChangeSlides } from "../../components/DetailPresentPage/useChangeSlides"

import { PresentationApiService } from 'src/api/services/presentation-api';

import { EditSlide } from '../../components/DetailPresentPage/EditSlide/EditSlide';
import { MainSlide } from '../../components/DetailPresentPage/MainSlide/MainSlide'
import { ListSlide } from '../../components/DetailPresentPage/ListSlide/ListSlide';
import { PresentationNav } from "../../components/DetailPresentPage/PresentationNav/PresentationNav";

import { useQuery, useMutation } from 'react-query';
import { Outlet, useParams } from 'react-router-dom';
import { Presentation } from 'src/models/presentation';
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
    const [ socket, setSocket ] = useState<Socket>();
    const { isLoading, isError, data, refetch } = useQuery<Presentation>(['getPresentationDetails', id], () => PresentationApiService.getPresentationById(id!))
    const [ isChangingSlide, setIsChangingSlide ] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar()
    const [ presentation, setPresentation ] = useState<Presentation>({
        id: '123',
        name: '',
        current: '-1',
        slides: []
    })
    const slidesControl = useChangeSlides(presentation.slides)

    // Push new name to backend
    const mutateChangeName = useMutation(PresentationApiService.updatePresentationName)

    const pushNewName = (newName: string) => {
        mutateChangeName.mutate({presentationId: id, newName: newName})
    }

    // Push new changes to backend
    const mutateChangeSlides = useMutation(PresentationApiService.updatePresentationSlides)

    useEffect(()=>{
        if (mutateChangeSlides.isSuccess){
          socket?.emit("Reload", presentation.id)
          refetch().then((result) => {
            if (result.data) {
              setPresentation(result.data)
            }
            slidesControl.pushStatus.setNeedToPush(false)
          })
        }
    }, [mutateChangeSlides.isSuccess])

    useEffect(() => {
        if (slidesControl.pushStatus.isNeedToPush) {
            mutateChangeSlides.mutate({presentationId: id, slides: slidesControl.slides})
        }
    }, [slidesControl.pushStatus.isNeedToPush]);

    // Socket
    useEffect(() => {
        setSocket(io('https://dnlearning-socket-server.onrender.com',  {transports: ['websocket']}))
    }, [])

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

    // Component
    return (
        <div className={style['detail-container']}>
            <Outlet context={{
                presentation,
                previousSlideFn,
                nextSlideFn,
                isChangingSlide,
            }}/>
            <PresentationNav isPublic={true} isChanged={slidesControl.isChanged()}
                nameControl={{
                    value: presentation.name,
                    setValue: (event: any) => setPresentation({...presentation, name: event.target.value}),
                    pushNewName: pushNewName
                }}
                slidesControl={slidesControl}/>
            <div className={style['detail-wrapper']}>
                <ListSlide slidesControl={slidesControl} currentPresent={presentation.current}/>
                <MainSlide slidesControl={slidesControl} />
                <EditSlide slidesControl={slidesControl} />
            </div>
        </div>
    )
}

export const DetailPresentPage = memo(DetailPresentPageComponent);
