import { memo, useState, FC, SyntheticEvent } from 'react';
import {
  Avatar,
  Grid, Rating, Typography,
} from '@mui/material';

import { Group as GroupItem } from 'src/models/group';
import style from './GroupCard.module.css';

import { NavigateFunction, useNavigate } from "react-router-dom"

interface Props {

  /** Group. */
  readonly group: GroupItem;
}

const GroupCardComponent: FC<Props> = ({
  group,
}) => {
  const navigate : NavigateFunction = useNavigate();

  return (
    <div className={style['group']} onClick={() => navigate('/group/' + group.id)}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <h3>{group.name}</h3>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="flex-end">
          <Avatar alt='' src={group.image} variant='square'/>
        </Grid>
      </Grid>
      <Typography variant="body1" gutterBottom>
        {group.name}
      </Typography>
      <hr className={style.divider} />
    </div>
  );
};

export const GroupCard = memo(GroupCardComponent);
