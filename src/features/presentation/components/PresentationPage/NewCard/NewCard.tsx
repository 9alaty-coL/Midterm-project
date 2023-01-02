import { memo, FC, useState, useEffect } from 'react';
import style from "./NewCard.module.css"

import { IconButton } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Button, TextField } from "@mui/material"

import { PresentationApiService } from 'src/api/services/presentation-api';
import { useMutation } from 'react-query'

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center'
};

const NewCardComponent: FC<any> = ({
    totalPresentation,
    type
}) => {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const createPresentMutation = useMutation(PresentationApiService.createPresentation, {
        onSuccess: async(data: any) => {
          navigate('/presentation/edit/' + data.data.presentationSaved._id)
        }
    })

    return (
        <div className={style['container']}>
            { type === "public" && <span className={style['title']}>You have {totalPresentation} public presentations</span> }
            { type === "group" &&  <span className={style['title']}>You are owner or co-owner of {totalPresentation} group presentations</span> }
            {
                type === "public" && <IconButton onClick={() => setOpen(true)}>
                    <ControlPointIcon sx={{fontSize: 30}}/>
                </IconButton>
            }
            
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={modalStyle}>
                    <span className={style['modal-title']}>Create new presentation</span>
                    <TextField placeholder="Enter new presentation name" autoComplete="off"
                        value={name} onChange={(event: any) => setName(event.target.value)}/>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexDirection: 'row'}}>
                        <Button variant="contained" color="error" onClick={() => {setOpen(false); setName('')}}>Cancel</Button>
                        <Button variant="contained" color="success" onClick={() => {setOpen(true); createPresentMutation.mutate(name)}}>Create</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export const NewCard = memo(NewCardComponent);
