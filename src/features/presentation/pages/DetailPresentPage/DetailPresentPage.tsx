import { FC, memo, useState } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

import style from "./DetailPresentPage.module.css";

import { PresentationApiService } from 'src/api/services/presentation-api'

import { PresentationNav } from "../../components/DetailPresentPage/PresentationNav/PresentationNav"
import { ListSlide } from '../../components/DetailPresentPage/ListSlide/ListSlide';
import { EditSlide } from '../../components/DetailPresentPage/EditSlide/EditSlide';
import { Slide } from '../../components/DetailPresentPage/Slide/Slide';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'

const DetailPresentPageComponent: FC = () => {
    const { id } = useParams()

    const { isLoading, isError, data } = (id === undefined ?
        { isLoading: false, isError: false, data: {
            name: 'New presentation',
            current: 1,
            slides: []
        }}:
        useQuery<any>('getPresentations', () => PresentationApiService.getPresentationById(id!))
    )

    const [presentation, setPresentation] = useState<any>({
        name: '',
        current: -1,
        slides: []
    })   
    
    const [currentSlide, setCurrentSlide] = useState(1)

    if (isLoading) {
        return <AppLoadingSpinner />
    }

    if (isError) {
        return <h1>Slide not found</h1>
    }

    if (presentation.current === -1) {
        setPresentation(data)
    }

    const addSlide = () => {
        setPresentation({...presentation, slides: [...presentation.slides, {
            question: 'New question?',
            answers: [
                {answer: 'Orange', count: 3},
                {answer: 'Blue', count: 2},
                {answer: 'Purple', count: 0},
                {answer: 'Yellow', count: 5}
            ]
        }]})
    }

    const editSlide = (index: number, newSlide: any) => {
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

    return (
        <div className={style['detail-container']}>
            <PresentationNav isPublic={true} 
                nameControl={{value: presentation.name, setValue: (event: any) => setPresentation({...presentation, name: event.target.value})}}/>
            <div className={style['detail-wrapper']}>
                <ListSlide presentation={presentation} 
                    listControl={{
                        current: currentSlide, setCurrent: setCurrentSlide, 
                        addSlide: addSlide,
                        deleteSlide: deleteSlide
                            }}/>
                <Slide />
                <EditSlide editSlide={editSlide}/>
            </div>
        </div>
    )
}

export const DetailPresentPage = memo(DetailPresentPageComponent);
