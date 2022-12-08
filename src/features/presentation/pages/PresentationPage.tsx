import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

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
        <div>
            {
                presentations.map((each: any, index: number) => <h1>{each.name}</h1>)
            }
        </div>
    )
}

export const PresentationPage = memo(PresentationPageComponent);
