import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { UserActions } from 'src/store/profile/dispatchers';
import { selectIsUserLoading, selectProfile } from 'src/store/profile/selectors';

import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper } from "@mui/material"

import { User } from "src/models/user"

import {useState } from "react"

import style from "./ProfileDetail.module.css";

interface Props {
    /** Profile . */
    readonly profile: User;
}

const ProfileDetailComponent: FC<Props> = ({
    profile
}) => {
    const [newProfile, setNewProfile] = useState({...profile});
    const [isEditable, setIsEditable] = useState(false)
    const dispatch = useAppDispatch();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(newProfile)
        dispatch(UserActions.updateProfile(newProfile))
    }

    return (
        <Paper elevation={5}>
            <form className={style['profile-container']} onSubmit={handleSubmit}>
                <div className={style['profile-container-row']}>
                    <div  className={style['profile-container-title']}>Profile detail: </div>
                </div>

                <div className={style['profile-container-row']}>
                    <TextField id="outlined-basic" label="First name" variant="outlined" value={newProfile.firstName} disabled={!isEditable}
                        onChange={(event: any) => setNewProfile({...newProfile, firstName: event.target.value})}
                        sx={{width: 250}}/>
                    <TextField id="outlined-basic" label="Last name" variant="outlined" value={newProfile.lastName}  disabled={!isEditable}
                        onChange={(event: any) => setNewProfile({...newProfile, lastName: event.target.value})}
                        sx={{width: 250}}/>         
                </div>
                <div className={style['profile-container-row']}>
                    <TextField id="outlined-basic" label="Year of birth" variant="outlined" value={newProfile.yearOfBirth} type="number"  disabled={!isEditable}
                        onChange={(event: any) => setNewProfile({...newProfile, yearOfBirth: event.target.value})}
                        sx={{width: 100}}/>   
                </div>
                <div className={style['profile-container-row']}>
                    <TextField id="outlined-basic" label="Address" variant="outlined" value={newProfile.address} disabled={!isEditable}
                        onChange={(event: any) => setNewProfile({...newProfile, address: event.target.value})}
                        sx={{width: "60vw"}}/>   
                </div>            
                <div className={style['profile-btn-wrapper-paper']}>
                    {!isEditable && <Button variant="outlined" onClick={() => setIsEditable(true)}>Edit profile</Button>}
                    {isEditable &&
                    <div className={style['profile-btn-wrapper']}>
                        <Button variant="contained" color="error" onClick={() => setIsEditable(false)}>Cancel</Button>
                        <Button variant="contained" color="primary" type="submit">Update</Button>
                    </div>}
                </div>  
            </form>        
  
        </Paper>

    )
}

export const ProfileDetail = memo(ProfileDetailComponent);
