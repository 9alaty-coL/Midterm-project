import { memo, FC, useState, useEffect } from 'react';
import style from "./PresentationNav.module.css"

import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import { IconButton, Button, CircularProgress, Divider, Snackbar, Alert } from '@mui/material/'
import { Paper, Modal, Box, TextField } from "@mui/material"

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query';
import { PresentationApiService } from 'src/api/services/presentation-api'

import { CollaboratorCard } from './CollaboratorCard/CollaboratorCard';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    height: '60vh',
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'flex-start',
    overflow:'scroll',
    overflowX: 'hidden',
};

const PresentationNavComponent: FC<any> = ({
    id,
    isPublic,
    isChanged,
    nameControl,
    slidesControl,
    isPrivate,
    collaborators
}) => {
    const navigate = useNavigate()

    const [isEditName, setEditName] = useState(false)
    const [isOpenSnackbar, setOpenSnackbar] = useState(false)
    const [isOpenCollab, setOpenCollab] = useState(false)

    const [email, setEmail] = useState('')

    const mutatePresenting = useMutation(PresentationApiService.present)
    useEffect(() => {
        if (mutatePresenting.isSuccess) {
            navigate('present', {
                replace: false,
            })
        }
    }, [mutatePresenting.isSuccess]);

    const mutateAddCollaborator = useMutation(PresentationApiService.addCollaborator, {
        onSuccess: () => {
            // refetch()
        }
    })

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
                {
                    !isPrivate && <>
                        <Button variant="contained" 
                            sx={{backgroundColor: '#E1D7C6', width: 200, color: 'black',
                                '&:hover': {
                                    backgroundColor: '#dbbf8e',
                                }
                            }} 
                            startIcon={<GroupsIcon />} 
                            onClick={() => setOpenCollab(true)}
                        >
                            Collaborators
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
                <Button variant="contained" color='info' 
                    startIcon={(slidesControl.pushStatus.isNeedToPush || mutatePresenting.isLoading) ? 
                        <CircularProgress size={15} sx={{color: 'white'}}/>: 
                        <PlayArrowIcon />} 
                        sx={{width: 100}} 
                    onClick={() => mutatePresenting.mutate(id)}
                    disabled={slidesControl.isChanged() || slidesControl.pushStatus.isNeedToPush}
                >
                    Present
                </Button>
                <Snackbar open={isOpenSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Successfully copied to clipboard!
                    </Alert>
                </Snackbar>
                <Modal
                    open={isOpenCollab}
                    onClose={() => setOpenCollab(false)}
                >
                    <Box sx={modalStyle}>
                        <span className={style['modal-title']}>Collaborators</span>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                            <TextField placeholder="Enter email to invite new collaborator" autoComplete="off"
                                value={email} onChange={(event: any) => setEmail(event.target.value)} sx={{width: '75%', height: '50px'}}/>
                            <Button variant="contained" sx={{width: '25%', height: '50px', fontSize: '20px'}}>
                                {mutateAddCollaborator.isLoading && <CircularProgress />}
                                {!mutateAddCollaborator.isLoading && <span>Add</span>}
                            </Button>
                        </Box>                           
                        {
                            collaborators.map((each: any, index: number) => <CollaboratorCard key={index} collaborator={each} presentationId={id}/>)
                        }
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export const PresentationNav = memo(PresentationNavComponent);