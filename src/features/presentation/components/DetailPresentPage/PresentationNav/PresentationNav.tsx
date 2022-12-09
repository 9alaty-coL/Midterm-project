import { memo, FC, useState } from 'react';
import style from "./PresentationNav.module.css"

import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IconButton, Button, TextField } from '@mui/material/'

import { useNavigate } from 'react-router-dom'

const PresentationNavComponent: FC<any> = ({
    isPublic,
    nameControl
}) => {
    const navigate = useNavigate()

    const [isEditName, setEditName] = useState(false)

    //className={style['']}
    return (
        <div className={style['nav-container']}>
            <div className={style['nav-wrapper']}>
                <IconButton onClick={() => navigate(isPublic ? '/presentation' : '')}>
                    <ArrowBackIcon sx={{fontSize: 50}}/>
                </IconButton>
                {
                    !isEditName && <>
                        <span className={style['nav-text']}>{nameControl.value}</span>
                        <IconButton onClick={() => setEditName(true)}>
                            <EditIcon sx={{fontSize: 30}}/>
                        </IconButton>                     
                    </>
                }
                {
                    isEditName && <>
                        <input value={nameControl.value} onChange={nameControl.setValue} 
                            className={style[nameControl.value === '' ? 'nav-input-error' : 'nav-input']}/>
                        <IconButton onClick={() => setEditName(false)} disabled={nameControl.value === ''}>
                            <CheckCircleOutlineIcon sx={{fontSize: 30}}/>
                        </IconButton>                     
                    </>
                }

            </div>
            <div className={style['nav-wrapper']} style={{paddingRight: 15}}>
                <Button variant="contained" sx={{backgroundColor: '#dbdce1', color: 'black'}} startIcon={<ShareIcon />}>
                    Share
                </Button>
                <Button variant="contained" color='info' startIcon={<PlayArrowIcon />}>
                    Present
                </Button>
            </div>
        </div>
    );
};

export const PresentationNav = memo(PresentationNavComponent);