import { memo, useState, FC, SyntheticEvent } from 'react';

import { Group, Group as GroupItem } from 'src/models/group';
import style from './GroupDetail.module.css';
import { GroupInfo } from './GroupInfo/GroupInfo';
import { InfoList } from './InfoList/InfoList';

interface Props {

  /** Group. */
  readonly group: Group;
}

const GroupDetailComponent: FC<Props> = ({ group }) => {

  return (
    <div className={style['group-detail-container']}>
      <GroupInfo group={group}/>
      <InfoList type='co-owner' list={group.coOwnerId}/>
      <InfoList type='member' list={group.memberId}/>
    </div>
  );
};

export const GroupDetail = memo(GroupDetailComponent);
