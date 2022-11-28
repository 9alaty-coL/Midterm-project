import { memo, useState, FC, SyntheticEvent } from 'react';

import { Group as GroupItem } from 'src/models/group';
import style from './GroupDetail.module.css';
import { GroupInfo } from './GroupInfo/GroupInfo';
import { InfoList } from './InfoList/InfoList';

interface Props {

  /** Group. */
  readonly group: any;

  /** Owner */
  readonly owner: any;

  /** Co-owners */
  readonly coOwners: any[];

  /** Members */
  readonly members: any[];
}

const GroupDetailComponent: FC<Props> = ({
  group,
  owner,
  coOwners,
  members
}) => {

  return (
    <div className={style['group-detail-container']}>
      <GroupInfo group={group} owner={owner}/>
      <InfoList type='co-owner' list={coOwners}/>
      <InfoList type='member' list={members}/>
    </div>
  );
};

export const GroupDetail = memo(GroupDetailComponent);
