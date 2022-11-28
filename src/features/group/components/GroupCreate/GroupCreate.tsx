import { memo, useState, FC, SyntheticEvent } from 'react';
import {
  Avatar,
  Grid, Rating, Typography,
  Button, TextField
} from '@mui/material';

import { Group as GroupItem } from 'src/models/group';
import style from './GroupCreate.module.css';

import { useNavigate, NavigateFunction } from "react-router-dom"

const CreateGroupComponent: FC = () => {
  const [group, setGroup] = useState<any>({name: "", image: ""})

  const navigate : NavigateFunction = useNavigate();

  const submitHandler = (event: any) => {
    event.preventDefault();

    console.log(group)
    //navigate('/group/:id')
  }

  return (
    <form className={style['group-create-container']} onSubmit={submitHandler}>
      <div className={style['group-create-title']}>Create new group</div>
      <div className={style['group-create-formrow']}>
        <span className={style['group-create-formrow-label']}>Group name: </span>
        <TextField id="outlined" variant="outlined" sx={{width: 300}}
          value={group.name} onChange={(event: any) => setGroup({...group, name: event.target.value})}
          required/>
      </div>
      <div className={style['group-create-formrow']}>
        <span className={style['group-create-formrow-label']}>Group avatar: </span>
        <TextField
          name="upload-photo"
          type="file"
          sx={{width: 300}}
          onChange={(event: any) => setGroup({...group, image: event.target.files[0]})}
          // value={group.image} onChange={(event: any) => console.log(event.target.files[0])}
        />        
      </div>
      <div className={style['group-create-btn-group']}>
        <Button variant="contained" color="error" onClick={() => navigate("/group")} sx={{width: 100}}>Cancel</Button>
        <Button variant="contained" type="submit" sx={{width: 100}}>Confirm</Button>
      </div>
    </form>
  );
};

export const CreateGroup = memo(CreateGroupComponent);
