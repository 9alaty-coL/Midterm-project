import { FC, memo, useEffect, useState } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { PresentationCard } from '../../components/PresentationPage/PresentationCard/PresentationCard'
import { NewCard } from '../../components/PresentationPage/NewCard/NewCard'

import { Box, Tabs, Tab, Divider } from "@mui/material"

import style from "./PresentationPage.module.css";

import { PresentationApiService } from 'src/api/services/presentation-api'

import { useQuery } from 'react-query';
import { Presentation } from 'src/models/presentation';

import { useMutation } from 'react-query'

const PresentationPageComponent: FC = () => {
    const { isLoading, isError, data: presentations, refetch } = useQuery<Presentation[]>({
        queryKey: 'GetPresentations',
        queryFn: PresentationApiService.getPresentations,
        refetchOnWindowFocus: false,
    })

    const deletePresentMutation = useMutation(PresentationApiService.removePresentation, {
        onSuccess: async(data: any) => {
          refetch()
        }
    })

    const [tab, setTab] = useState(0)

    if (isLoading) {
        return <AppLoadingSpinner />
    }

    if (isError || presentations == null) {
        return <>
            <NewCard totalPresentation={0} type="public"/>
        </>
    }

    if (presentations.length === 0) {
        return <>
            <NewCard totalPresentation={0} type="public"/>
        </>    
    }

    const deleteHandler = (id: string) => {
        deletePresentMutation.mutate(id)
    }

    return (

        <div className={style['presentation-container']}>
            <Box sx={{ borderColor: 'divider', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px', width: '70vw'}}>
                <Tabs value={tab} onChange={(event: any, num: number) => setTab(num) } sx={{width: '400px'}}>
                    <Tab label="Public" className={style['tab-label']} />
                    <Tab label="Group" className={style['tab-label']} />    
                </Tabs>
                <Divider orientation='vertical' variant="middle" flexItem />
                <NewCard totalPresentation={presentations.length} type={tab === 0 ? "public" : "group"}/>
            </Box>
            {
                tab === 0 &&
                presentations.map((each: Presentation) => <PresentationCard key={each.id} type="public" isOwned={true} presentation={each} deleteHandler={() => deleteHandler(each.id)}/>)
                // presentations.map((each: Presentation) => !each.isPrivate && <PresentationCard key={each.id} type="public" isOwned={true} presentation={each} deleteHandler={() => deleteHandler(each.id)}/>)
            }
            {
                tab === 1 &&
                presentations.map((each: Presentation) => <PresentationCard key={each.id} type="group" isOwned={false} presentation={each} deleteHandler={() => deleteHandler(each.id)}/>)
                // presentations.map((each: Presentation) => each.isPrivate && <PresentationCard key={each.id} type="group" isOwned={true} presentation={each} deleteHandler={() => deleteHandler(each.id)}/>)
            }
        </div>
    )
}

export const PresentationPage = memo(PresentationPageComponent);
