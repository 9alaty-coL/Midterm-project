import { memo, useState, FC, SyntheticEvent, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

import { Group, Group as GroupItem } from 'src/models/group';
import { useAppDispatch, useAppSelector } from 'src/store';
import { UserActions } from 'src/store/profile/dispatchers';
import { selectProfile } from 'src/store/profile/selectors';
import style from './GroupDetail.module.css';
import { GroupInfo } from './GroupInfo/GroupInfo';
import { InfoList } from './InfoList/InfoList';
import { InviteEmail } from './InviteEmail/InviteEmail';
import { CreatePrivate } from "./CreatePrivate/CreatePrivate"

interface Props {

  /** Group. */
  readonly group: Group;
}

const GroupDetailComponent: FC<Props> = ({ group }) => {
  const me = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (me == null) {
      dispatch(UserActions.fetchProfile());
    }
  }, []);

  if (me == null) {
    dispatch(UserActions.fetchProfile());
    return <AppLoadingSpinner />;
  }

  return (
    <div className={style['group-detail-container']}>
      <GroupInfo group={group}/>
      <InviteEmail />
      <CreatePrivate group={group}/>
      <InfoList groupName={group.name} groupId={group.id} disabledReAssign={group.ownerId !== me.id} allowEdit={group.ownerId === me.id} type='co-owner' list={group.coOwnerId}/>
      <InfoList groupName={group.name} groupId={group.id} disabledReAssign={group.ownerId !== me.id} allowEdit={group.coOwnerId.includes(me.id) || group.ownerId === me.id} type='member' list={group.memberId}/>
    </div>
  );
};

export const GroupDetail = memo(GroupDetailComponent);
