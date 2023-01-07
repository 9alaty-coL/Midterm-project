import { memo, FC, useState, useEffect } from 'react';
import style from "./PresentationCard.module.css"

import { Paper, Divider, IconButton, CircularProgress } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BackspaceIcon from '@mui/icons-material/Backspace';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import { useNavigate } from "react-router-dom";
import { Answer, Slide } from 'src/models/slide';

import { useQuery, useMutation } from 'react-query'
import { PresentationApiService } from 'src/api/services/presentation-api'
import { GroupApiService } from 'src/api/services/group-api';

import { selectProfile } from 'src/store/profile/selectors';
import { useAppSelector } from 'src/store';
import { Presentation } from 'src/models/presentation';
import { User } from 'src/models/user'

import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

const isAbleToDelete = (profile: any, presentation: Presentation): boolean => {
    if (profile === undefined || profile === null) return false
    return (profile!.id === presentation.createdBy || profile!.owner.filter((group: any) => group.id === presentation.groupId).length > 0)
}

const PrivateCardComponent: FC<any> = ({
    presentation,
    deleteHandler
}) => {
    const profile = useAppSelector(selectProfile);
    const navigate = useNavigate();
    const [ isDeleting, setDeleting ] = useState(false)

    // Push presenting status
    const mutatePresenting = useMutation(PresentationApiService.present)

    // Get group name
    const { isLoading, isError, data: groupInfo } = useQuery<any>({
        queryKey: 'getGroupInfomation',
        queryFn: GroupApiService.getGroupById.bind(null, presentation.groupId),
        refetchOnWindowFocus: false,
        onSuccess: (data) => console.log(data)
    })

    useEffect(() => {
        if (mutatePresenting.isSuccess) {
            navigate('/presentation/edit/' + presentation.id + '/present')
        }
        else if (mutatePresenting.isError) {

        }
    }, [mutatePresenting.isSuccess]);

    const countVoted = () => {
        return presentation.slides.reduce(
            (sum : number, slide: Slide) => sum + slide.answers.reduce(
                (voted : number, answer: Answer) => voted + answer.count
            , 0)
        , 0);
    }

    if (isLoading) {
        return <AppLoadingSpinner />
    }
    else if (isError) {
        return <div>Group name not found</div>
    }

    return (
        <Paper elevation={2} className={style['card-container']}>
            { 
                mutatePresenting.isLoading && 
                <IconButton sx={{color: '#82C3EC', width: '70px'}} disabled>
                    <CircularProgress sx={{fontSize: '50px'}}/>
                </IconButton>
            }
            {
                !mutatePresenting.isLoading &&  
                <IconButton onClick={() => {
                    mutatePresenting.mutate(presentation.id)
                }}
                    sx={{color: '#82C3EC', width: '70px'}}
                    disabled={presentation.isPresenting || (!mutatePresenting.isLoading)}
                >
                    { presentation.isPresenting && <CoPresentIcon sx={{fontSize: '50px'}} />}
                    { !presentation.isPresent && <PlayCircleOutlineIcon sx={{fontSize: 50}} />}
                </IconButton>
            }
           
            <Divider orientation="vertical" flexItem />
            <div className={style['info-wrapper']}>
                <span className={style['card-tittle']} onClick={() => navigate('/presentation/edit/' + presentation.id)}>
                    {presentation.name}
                </span>
                <span className={style['card-text']}>{presentation.slides.length} slides</span>
                <span className={style['card-text']}>
                    <b>
                        {profile!.owner.filter((each: any) => each.id === groupInfo.id).length > 0 ? " Owner " : ""} 
                        {profile!.co_owner.filter((each: any) => each.id === groupInfo.id).length > 0 ? " Co-Owner " : ""} 
                    </b>
                    Group: {presentation.isPrivate ? groupInfo.name : ""} 
                </span>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={style['vote-wrapper']}>
                <span className={style['card-vote-text']}><b>{countVoted()}</b> voted</span>
            </div>
            {
                isAbleToDelete(profile, presentation) && <>
                    <Divider orientation="vertical" flexItem />
                    <IconButton onClick={() => {deleteHandler(); setDeleting(true)}} disabled={isDeleting} sx={{color: '#EB455F', width: '70px'}}>
                        {!isDeleting && <BackspaceIcon sx={{fontSize: '50px'}} />}
                        {isDeleting && <CircularProgress sx={{fontSize: '50px'}}/>}
                    </IconButton>                
                </>
            }
        </Paper>
    );
};

export const PrivateCard = memo(PrivateCardComponent);
