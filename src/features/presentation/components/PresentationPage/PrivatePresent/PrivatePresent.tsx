import { FC, memo } from 'react';

import { Presentation } from 'src/models/presentation';
import { useQuery, useMutation } from 'react-query'
import { PresentationApiService } from 'src/api/services/presentation-api'

import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { NewCard } from '../NewCard/NewCard'
import { PresentationCard } from '../PresentationCard/PresentationCard'

import { selectProfile } from 'src/store/profile/selectors';
import { useAppSelector } from 'src/store';

const PrivatePresentComponent: FC<any> = ({
    tab,
    setGroupCount
}) => {
    const profile = useAppSelector(selectProfile);

    const { isLoading, isError, data: presentations, refetch } = useQuery<Presentation[]>({
        queryKey: 'GetGroupPresentations',
        queryFn: PresentationApiService.getGroupPresentations,
        refetchOnWindowFocus: false,
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
        return <>{ tab === 1 && <AppLoadingSpinner /> } </>
    }

    if (isError || presentations == null) {
        return <>{ tab === 1 && <NewCard totalPresentation={0} type="public"/> } </>
    }

    setGroupCount(presentations.length)

    if (presentations.length === 0) {
        return <>{ tab === 1 && <NewCard totalPresentation={0} type="public"/>} </>    
    }   

    return <>
        {
            tab === 1 && presentations.map((each: Presentation) => <PresentationCard key={each.id} type="group" isOwned={profile!.id === each.createdBy} presentation={each} deleteHandler={() => deleteHandler(each.id)}/>)
        }
    </>
}

export const PrivatePresent = memo(PrivatePresentComponent);
