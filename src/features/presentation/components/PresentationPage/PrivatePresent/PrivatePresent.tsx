import { FC, memo } from 'react';

import { Presentation } from 'src/models/presentation';
import { useQuery, useMutation } from 'react-query'
import { PresentationApiService } from 'src/api/services/presentation-api'

import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { NewCard } from '../NewCard/NewCard'
import { PrivateCard } from '../PresentationCard/PrivateCard'

import { selectProfile } from 'src/store/profile/selectors';
import { useAppSelector } from 'src/store';

const PrivatePresentComponent: FC<any> = ({
    tab,
    setGroupCount
}) => {
    const profile = useAppSelector(selectProfile);

    const { isLoading, isError, data: presentations, refetch } = useQuery<Presentation[]>({
        queryKey: 'getPrivatePresent',
        queryFn: PresentationApiService.getGroupPresentations,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (data === null || data === undefined) setGroupCount(0)
            else setGroupCount(data.length)
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
        return <>{ tab === 1 && <AppLoadingSpinner /> } </>
    }

    if (isError || presentations == null || profile === null ) {
        return <>{ tab === 1 &&  <div style={{fontSize: '20px'}}>You don't have any group presentation</div> } </>
    }

    if (presentations.length === 0) {
        return <>{ tab === 1 &&  <div style={{fontSize: '20px'}}>You don't have any group presentation</div>} </>    
    }

    return <>
        {
            tab === 1 && presentations.map((each: Presentation) => <PrivateCard key={each.id} isOwned={profile!.id === each.createdBy} presentation={each} deleteHandler={() => deleteHandler(each.id)}/>)
        }
    </>
}

export const PrivatePresent = memo(PrivatePresentComponent);
