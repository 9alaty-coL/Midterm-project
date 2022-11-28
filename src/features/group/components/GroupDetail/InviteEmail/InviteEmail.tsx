import { memo, FC } from 'react';
import style from './InfoList.module.css';

import { Divider, Paper, TextField, IconButton } from "@mui/material"
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserSlash } from "@fortawesome/free-solid-svg-icons"

import { useState, useEffect } from "react"

const InfoListComponent: FC = () => {
    const [email, setMail] = useState<string>("")

    return ( 
        <Paper elevation={2} className={style['list-container']}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}> 
            <TextField id="outlined-basic" label="Outlined" variant="outlined" 
                value={email} onChange={(event: any) => setMail(event.target.value)}/>       
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <ForwardToInboxIcon />
            </IconButton>                
        </Paper>

    );
}
 
export const InfoList = memo(InfoListComponent);