import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { selectGroups, selectIsGroupLoading } from 'src/store/groups/selectors';
import { Group } from '../components/Group/Group';

const GroupPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups)
  const isLoading = useAppSelector(selectIsGroupLoading);
  useEffect(() => {
    dispatch(GroupsActions.fetchGroups());
  }, [dispatch])

  if (isLoading) {
    return <AppLoadingSpinner />
  }

  return <>
    {groups.map(group => <Group group={group} key={group.id} />)}
  </>
}

export const GroupPage = memo(GroupPageComponent);