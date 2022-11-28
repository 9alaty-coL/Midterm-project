import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { FC, memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupDetailsActions } from 'src/store/groupDetails/dispatchers';
import { selectGroupDetailError, selectGroupDetails, selectIsGroupDetailLoading } from 'src/store/groupDetails/selectors';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { selectIsAddingUser } from 'src/store/groups/selectors';
import { JoinGroup } from '../components/JoinGroup.tsx/JoinGroup';

const JoinGroupPageComponent: FC = () => {
  const params = useParams();
  const { groupId } = params;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isLoadingGroup = useAppSelector(selectIsGroupDetailLoading);
  const isAddingUser = useAppSelector(selectIsAddingUser);
  const error = useAppSelector(selectGroupDetailError);
  const groupDetails = useAppSelector(selectGroupDetails)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GroupDetailsActions.fetchGroupDetails(groupId ?? ''));
  }, [groupId, dispatch])

  if (isLoadingGroup || groupDetails.length === 0) {
    return <AppLoadingSpinner />;
  }

  if (error || groupId == null) {
    return <h1>{error}</h1>
  }

  const handleJoin = () => {
    dispatch(GroupsActions.addUserToGroup(groupId)).then(
      (result: any) => {
        if (result.error) {
          enqueueSnackbar('User already existed in this group', { variant: 'error' });
          return;
        }
        navigate('/group');
      }
    )
  }

  return <JoinGroup name={groupDetails[0].name} onClick={handleJoin} />;
}

export const JoinGroupPage = memo(JoinGroupPageComponent);
