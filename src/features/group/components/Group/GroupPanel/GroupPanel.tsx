import { memo, useState, FC, SyntheticEvent } from 'react';
import {
  Avatar,
  Grid, Rating, Typography,
} from '@mui/material';

import { Group as GroupItem } from 'src/models/group';
import style from './GroupPanel.module.css';

import { GroupCard } from "../GroupCard/GroupCard"

interface Props {

  /** Group. */
  readonly groups: GroupItem[];

  /** Show */
  readonly show: boolean;
}

const GroupPanelComponent: FC<Props> = ({
  groups,
  show
}) => {

  return (
    <>    
        {
            show && 
            <div className={style['group-panel']}>
                {groups.map((each: GroupItem, index: number) => <GroupCard key={index} group={each}/>)}
            </div>
        }
    </>  
  );
};

export const GroupPanel = memo(GroupPanelComponent);
