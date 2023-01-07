import { FC, memo } from 'react';

import { Presentation } from 'src/models/presentation';
import { useQuery, useMutation } from 'react-query'
import { PresentationApiService } from 'src/api/services/presentation-api'

import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { NewCard } from '../NewCard/NewCard'
import { PublicCard } from '../PresentationCard/PublicCard'

import { selectProfile } from 'src/store/profile/selectors';
import { useAppSelector } from 'src/store';

const PublicPresentComponent: FC<any> = ({
    tab,
    setPublicCount
}) => {
    const profile = useAppSelector(selectProfile);

    const { isLoading, isError, data: presentations, refetch } = useQuery<Presentation[]>({
        queryKey: 'getPublicPresent',
        queryFn: PresentationApiService.getPresentations,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (data === null || data === undefined) setPublicCount(0)
            else setPublicCount(data.length)
        }
    })

    const deletePresentMutation = useMutation(PresentationApiService.removePresentation, {
        onSuccess: async(data: any) => {
          refetch()
        }
    })

    const deleteHandler = (id: string) => {
        deletePresentMutation.mutate(id)
    }

    if (isLoading) {
        return <>{ tab === 0 && <AppLoadingSpinner /> }</>
    }

    if (isError || presentations == null || profile === null) {
        return <>{ tab === 0 && <NewCard totalPresentation={0} type="public"/> } </>
    }

    if (presentations.length === 0) {
        return <>{ tab === 0 && <NewCard totalPresentation={0} type="public"/> }</>
    }

    return <>
        {
            tab === 0 && presentations.map((each: Presentation) => <PublicCard key={each.id} isOwned={profile!.id === each.createdBy} presentation={each} deleteHandler={() => deleteHandler(each.id)}/>)
        }
    </>
}

export const PublicPresent = memo(PublicPresentComponent);
