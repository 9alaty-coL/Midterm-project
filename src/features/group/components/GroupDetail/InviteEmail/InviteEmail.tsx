import { memo, FC } from 'react';
import style from './InviteEmail.module.css';

import { Divider, Paper, InputBase, IconButton, Snackbar, Alert } from "@mui/material"
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserSlash } from "@fortawesome/free-solid-svg-icons"

import { useState, useEffect } from "react"

const InviteEmailComponent: FC = () => {
    const [email, setMail] = useState<string>("")

    const [isOpenSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [isValidEmail, setValidEmail] = useState<boolean>(true)

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
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
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