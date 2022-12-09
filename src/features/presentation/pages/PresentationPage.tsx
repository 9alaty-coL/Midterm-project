import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { PresentationCard } from '../components/PresentationCard/PresentationCard'
import { NewCard } from '../components/NewCard/NewCard'

import style from "./PresentationPage.module.css";

import { PresentationApiService } from 'src/api/services/presentation-api'

import { useQuery } from 'react-query';

const PresentationPageComponent: FC = () => {
    const { isLoading, isError, data: presentations } = useQuery<any>('getPresentations', PresentationApiService.getPresentations)

    console.log({ isLoading, isError, presentations })

    if (isLoading) {
        return <AppLoadingSpinner />
    }

    if (isError) {
        return <h1>Presentation not found</h1>
    }


    console.log(presentations)
    return (
        <div className={style['presentation-container']}>
            <NewCard totalPresentation={presentations.length} />
            {
                presentations.map((each: any, index: number) => <PresentationCard key={index} presentation={each}/>)
            }
        </div>
    )
}

export const PresentationPage = memo(PresentationPageComponent);
