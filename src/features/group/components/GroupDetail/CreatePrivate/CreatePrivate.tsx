import { memo, useState, FC } from 'react';

import { Paper, Modal, Box, TextField, Button } from "@mui/material"
import { IconButton } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { PresentationApiService } from 'src/api/services/presentation-api';

import style from './CreatePrivate.module.css';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

import { selectProfile } from 'src/store/profile/selectors';
import { useAppSelector } from 'src/store';

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
    const profile = useAppSelector(selectProfile);

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const { isLoading, isError, data: presentingInfo } = useQuery<any>({
        queryKey: 'GetGroupPresentations',
        queryFn: PresentationApiService.getGroupPresenting.bind(null, group.id),
        refetchOnWindowFocus: false,
        onSuccess: (data) => console.log(data)
    })

    const createGroupPresentMutation = useMutation(PresentationApiService.createGroupPresentation, {
        onSuccess: async(data: any) => {
          navigate('/presentation/edit/' + data.data.presentationSaved._id)
        }
    })
    
    const isAbleToCreate = (): boolean => {
        if (profile === undefined || profile === null) return false
        return (profile!.owner.filter((each: any) => each.id === group.id).length > 0 
            || profile!.co_owner.filter((each: any) => each.id === group.id).length > 0)
    }

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
                {
                    isAbleToCreate() && <IconButton onClick={() => setOpen(true)}>
                        <ControlPointIcon sx={{fontSize: 30}}/>
                    </IconButton>
                }
            </div>
        </div>
        <div className={style['list-body']}>
            {
                presentingInfo.isPresenting ? 
                <span style={{fontSize: '20px'}}>Presentation <b>{presentingInfo.groupPresentingPresentation[0].name}</b> is being presented in this group!</span> :
                <span style={{fontSize: '20px'}}>No presentation is presenting . . .</span>
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