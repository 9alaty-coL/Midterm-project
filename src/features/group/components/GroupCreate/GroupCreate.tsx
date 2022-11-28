import { memo, useState, FC, SyntheticEvent } from 'react';
import {
  Avatar,
  Grid, Rating, Typography,
} from '@mui/material';

import { Group as GroupItem } from 'src/models/group';
import style from './GroupCreate.module.css';

interface Props {

  /** Group. */
  readonly group: GroupItem;
}

const CreateGroupComponent: FC = () => {

  return (
    <div className={style['group-create-container']}>
      
    </div>
  );
};

export const CreateGroup = memo(CreateGroupComponent);
