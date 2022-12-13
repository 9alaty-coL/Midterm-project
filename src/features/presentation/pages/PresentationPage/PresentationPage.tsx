import { FC, memo, useEffect, useState } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { PresentationCard } from '../../components/PresentationPage/PresentationCard/PresentationCard'
import { NewCard } from '../../components/PresentationPage/NewCard/NewCard'

import style from "./PresentationPage.module.css";

import { PresentationApiService } from 'src/api/services/presentation-api'

import { useQuery } from 'react-query';
import { Presentation } from 'src/models/presentation';

import { useMutation } from 'react-query'

const PresentationPageComponent: FC = () => {
    const { isLoading, isError, data: presentations, refetch } = useQuery<Presentation[]>('getPresentations', PresentationApiService.getPresentations)

    const deletePresentMutation = useMutation(PresentationApiService.removePresentation, {
        onSuccess: async(data: any) => {
          refetch()
        }
    })

    if (isLoading) {
        return <AppLoadingSpinner />
    }

    if (isError || presentations == null) {
        return <h1>Presentation not found</h1>
    }

    if (presentations.length === 0) {
        return <span>Empty!</span>
    }

    const deleteHandler = (id: string) => {
        deletePresentMutation.mutate(id)
    }

    return (
        <div className={style['presentation-container']}>
            <NewCard totalPresentation={presentations.length} type="public"/>
            {
                presentations.map((each: Presentation) => <PresentationCard key={each.id} presentation={each} deleteHandler={() => deleteHandler(each.id)}/>)
            }
        </div>
    )
}

export const PresentationPage = memo(PresentationPageComponent);
