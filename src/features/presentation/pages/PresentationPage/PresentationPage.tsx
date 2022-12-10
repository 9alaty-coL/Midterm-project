import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { PresentationCard } from '../../components/PresentationPage/PresentationCard/PresentationCard'
import { NewCard } from '../../components/PresentationPage/NewCard/NewCard'

import style from "./PresentationPage.module.css";

import { PresentationApiService } from 'src/api/services/presentation-api'

import { useQuery } from 'react-query';
import { Presentation } from 'src/models/presentation';

const PresentationPageComponent: FC = () => {
    const { isLoading, isError, data: presentations } = useQuery<Presentation[]>('getPresentations', PresentationApiService.getPresentations)

    console.log({ isLoading, isError, presentations })

    if (isLoading) {
        return <AppLoadingSpinner />
    }

    if (isError || presentations == null) {
        return <h1>Presentation not found</h1>
    }

    return (
        <div className={style['presentation-container']}>
            <NewCard totalPresentation={presentations.length} type="public"/>
            {
                presentations.map((each: any, index: number) => <PresentationCard key={index} presentation={each}/>)
            }
        </div>
    )
}

export const PresentationPage = memo(PresentationPageComponent);
