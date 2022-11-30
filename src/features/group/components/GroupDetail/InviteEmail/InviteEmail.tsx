import { memo, FC } from 'react';
import style from './InviteEmail.module.css';

import { Divider, Paper, InputBase, IconButton, Snackbar, Alert } from "@mui/material"
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserSlash } from "@fortawesome/free-solid-svg-icons"

import { useState, useEffect } from "react"
import { UserApiService } from 'src/api/services/user-api';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

const InviteEmailComponent: FC = () => {
    const [email, setMail] = useState<string>("")

    const [isOpenSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [isValidEmail, setValidEmail] = useState<boolean>(true)
    const { enqueueSnackbar } = useSnackbar()
    const params = useParams()

    return (
        <>
            <Paper elevation={2} className={style['list-container']}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}> 
                <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: 20 }}
                    placeholder="Nhập email của người cần mời . . ."
                    inputProps={{ 'aria-label': 'Nhập email của người cần mời . . .' }}
                    value={email} onChange={(event: any) => setMail(event.target.value)}
                />    
                <Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
                    onClick={() => {
                        if (email == null || email == '') {
                            enqueueSnackbar('Invalid email', {variant: 'error'})
                            return;
                        }

                        UserApiService.sendInvitation(email, params.groupId ?? '').then(() => {
                            enqueueSnackbar('Send invitation successfully (Remember to check your spam)', {variant: 'success'})
                        }).catch((error) => {
                            console.log(error)
                            if (error instanceof AxiosError) {
                                enqueueSnackbar(error.response?.data.message, {variant: 'error'})
                            }
                        })

                    }}
                >
                    <ForwardToInboxIcon fontSize="large"/>
                </IconButton>                
            </Paper>
            <Snackbar open={isOpenSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                { 
                    isValidEmail ? 
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Successfully send invitation!
                    </Alert>
                    :
                    <Alert severity="error" sx={{ width: '100%' }}>
                        This email is not register!
                    </Alert>
                }
            </Snackbar>
        </>
        
    );
}
 
export const InviteEmail = memo(InviteEmailComponent);