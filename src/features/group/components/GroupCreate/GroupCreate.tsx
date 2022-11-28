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
    <div className={style['group']}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="flex-end">
        </Grid>
      </Grid>
      <hr className={style.divider} />
    </div>
  );
};

export const CreateGroup = memo(CreateGroupComponent);
