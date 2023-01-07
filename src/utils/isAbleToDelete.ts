import { selectProfile } from 'src/store/profile/selectors';
import { useAppSelector } from 'src/store';
import { Presentation } from 'src/models/presentation';

const isAbleToDelete = (presentation: Presentation): boolean => {
    const profile = useAppSelector(selectProfile);

    if (profile === undefined) return false
    return (profile!.id === presentation.createdBy || profile!.owner.filter((group: any) => group.id === presentation.groupId).length > 0)
}

export default isAbleToDelete;