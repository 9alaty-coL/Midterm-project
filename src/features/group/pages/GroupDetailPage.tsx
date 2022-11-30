import { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupDetailsActions } from 'src/store/groupDetails/dispatchers';
import { selectGroupDetails, selectIsGroupDetailLoading } from 'src/store/groupDetails/selectors';
import { GroupDetail } from '../components/GroupDetail/GroupDetail';

const GroupDetailPageComponent: FC = () => {
  const { groupId } = useParams();
  const dispatch = useAppDispatch();
  const groupDetails = useAppSelector(state => selectGroupDetails(state, groupId  ?? ''));
  const isLoading = useAppSelector(selectIsGroupDetailLoading);

  useEffect(() => {
    if (groupId == null) return;
    dispatch(GroupDetailsActions.fetchGroupDetails(groupId))
  }, [groupId, dispatch])

  if(isLoading) {
    return <AppLoadingSpinner />;
  }

  if (groupDetails == null) {
    return <h1>No group with given id</h1>
  }

  return <GroupDetail group={groupDetails} />
}

export const GroupDetailPage = memo(GroupDetailPageComponent);
