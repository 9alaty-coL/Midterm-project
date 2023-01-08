import { memo, FC } from 'react';

import {
    Avatar, IconButton, Divider, Paper
} from '@mui/material';

import style from "./CollaboratorCard.module.css"
import BackspaceIcon from '@mui/icons-material/Backspace';
import { CircularProgress } from '@mui/material';

import { useMutation } from 'react-query';
import { PresentationApiService } from 'src/api/services/presentation-api'

const CollaboratorCardComponent: FC<any> = ({
    collaborator,
    presentationId
}) => {
    const mutateDeleteCollaborator = useMutation(PresentationApiService.removeCollaborator, {
        onSuccess: () => {
            // refetch()
        }
    })

    return (
    <Paper elevation={1} className={style['card-container']}>
        {collaborator.name}
        <Avatar src={collaborator.avatar} sx={{ width: 55, height: 55, paddingLeft: '5px' }}/>
        <div className={style['card-info-wrapper']}>
            <div className={style['card-name']}>{collaborator.firstname} {collaborator.lastname}</div>
            <div className={style['card-email']}>{collaborator.email}</div>
        </div>
        <Divider />
        <IconButton onClick={() => mutateDeleteCollaborator.mutate({
                presentationId, email: collaborator.email
            })} 
            disabled={mutateDeleteCollaborator.isLoading} 
            sx={{color: '#EB455F', width: '70px'}}
        >
            {!mutateDeleteCollaborator.isLoading && <BackspaceIcon sx={{fontSize: '50px'}} />}
            {mutateDeleteCollaborator.isLoading && <CircularProgress sx={{fontSize: '50px'}}/>}
        </IconButton>
    </Paper>)
};

export const CollaboratorCard = memo(CollaboratorCardComponent);