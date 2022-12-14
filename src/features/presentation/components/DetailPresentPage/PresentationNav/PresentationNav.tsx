import { memo, FC, useState, useEffect } from 'react';
import style from "./PresentationNav.module.css"

import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IconButton, Button, CircularProgress, Divider, Snackbar, Alert } from '@mui/material/'

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useNavigate } from 'react-router-dom'

const PresentationNavComponent: FC<any> = ({
    id,
    isPublic,
    isChanged,
    nameControl,
    slidesControl
}) => {
    const navigate = useNavigate()

    const [isEditName, setEditName] = useState(false)
    const [isOpenSnackbar, setOpenSnackbar] = useState(false)

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
                        <IconButton onClick={() => {nameControl.pushNewName(nameControl.value); setEditName(false)}} disabled={nameControl.value === ''}>
                            <CheckCircleOutlineIcon sx={{fontSize: 30}}/>
                        </IconButton>                     
                    </>
                }

            </div>
            <div className={style['nav-wrapper']} style={{paddingRight: 15}}>
                {
                    isChanged && <>
                        <Button variant="contained" color="error" startIcon={<BackspaceIcon />} sx={{width: 100}}
                            onClick={() => slidesControl.cancelSlide()}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" startIcon={<SaveIcon />} sx={{width: 100}}
                            onClick={() => slidesControl.saveSlides()}
                        >
                            Save
                        </Button>
                        <Divider orientation="vertical" flexItem />
                    </>
                }
                <CopyToClipboard text={"https://group-master.vercel.app/presentation/join/" + id} 
                    onCopy={() => setOpenSnackbar(true)}>
                    <Button variant="contained" sx={{backgroundColor: '#dbdce1', color: 'black', width: 100}} startIcon={<ShareIcon />} >
                        Share
                    </Button>
                </CopyToClipboard>
                <Button variant="contained" color='info' startIcon={slidesControl.pushStatus.isNeedToPush ? <CircularProgress size={15} color="primary"/>: <PlayArrowIcon />} sx={{width: 100}} 
                    onClick={() => navigate('present', {
                        replace: false,
                    })}
                    disabled={slidesControl.isChanged() || slidesControl.pushStatus.isNeedToPush}
                >
                    Present
                </Button>
                <Snackbar open={isOpenSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Successfully copied to clipboard!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export const PresentationNav = memo(PresentationNavComponent);