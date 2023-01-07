import { memo, useState, FC } from 'react';

import { Presentation } from 'src/models/presentation';

import { Paper, Modal, Box, TextField, Button } from "@mui/material"
import { IconButton } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { PresentationApiService } from 'src/api/services/presentation-api';

import style from './CreatePrivate.module.css';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

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

const CreatePrivateComponent: FC<any> = ({ group }) => {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const { isLoading, isError, data: presentingInfo } = useQuery<any>({
        queryKey: 'GetGroupPresentations',
        queryFn: PresentationApiService.getGroupPresenting.bind(null, group.id),
        refetchOnWindowFocus: false
    })

    const createGroupPresentMutation = useMutation(PresentationApiService.createGroupPresentation, {
        onSuccess: async(data: any) => {
          navigate('/presentation/edit/' + data.data.presentationSaved._id)
        }
    })

    if (isLoading) {
        return <AppLoadingSpinner />;
    }

    if (isError || presentingInfo == null) {
        return <h1>Group presenting info is not found</h1>;
    }

    if (presentingInfo == null) {
        return <h1>Group presenting info is not found</h1>;
    }

    return (         
    <Paper elevation={2} className={style['list-container']}>
        <div className={style['list-header']}>
            <div className={style['list-title']}>
                Group presentation 
                <IconButton onClick={() => setOpen(true)}>
                    <ControlPointIcon sx={{fontSize: 30}}/>
                </IconButton>
            </div>
        </div>
        <div className={style['list-body']}>
            {
                presentingInfo.isPresenting ? 
                <span>{presentingInfo.groupPresentingPresentation.name} is being presented in this group</span> :
                <span>No presentation is presenting . . .</span>
            }
        </div>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={modalStyle}>
                <span className={style['modal-title']}>Create group presentation</span>
                <TextField placeholder="Enter new presentation name" autoComplete="off"
                    value={name} onChange={(event: any) => setName(event.target.value)}/>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexDirection: 'row'}}>
                    <Button variant="contained" color="error" 
                        onClick={() => {setOpen(false); setName('')}}>Cancel</Button>
                    <Button variant="contained" color="success" 
                        onClick={() => {setOpen(true); createGroupPresentMutation.mutate({groupId: group.id, name: name})}}>Create</Button>
                </Box>
            </Box>
        </Modal>
    </Paper>
  );
};

export const CreatePrivate = memo(CreatePrivateComponent);