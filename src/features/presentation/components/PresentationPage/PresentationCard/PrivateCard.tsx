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

import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { NotificationApiService } from 'src/api/services/notification-api';
import { io, Socket } from 'socket.io-client';
import { Group } from 'src/models/group';

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
    const [socket, setSocket] = useState<Socket>();

    // Push presenting status
    const mutatePresenting = useMutation(PresentationApiService.present)

    // Get group name
    const { isLoading, isError, data: groupInfo } = useQuery<any>({
        queryKey: 'getGroupInfomation' + presentation.id,
        queryFn: GroupApiService.getGroupById.bind(null, presentation.groupId),
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        setSocket(io('https://dnlearning-socket-server.onrender.com',  {transports: ['websocket']}))
    }, [])

    useEffect(() => {
        if (mutatePresenting.isSuccess) {
            let groupData: Group;
            GroupApiService.getGroupById(presentation.groupId)
                .then(group => {
                    groupData = group;
                    return NotificationApiService.notifyGroupUser([...group.memberId, ...group.coOwnerId], `Presentation ${presentation.name} is presenting in group ${group.name}`)
                })
                .then(() => {
                    // socket io here
                    socket?.emit("NotifyListUser", [...groupData.memberId, ...groupData.coOwnerId], `Presentation ${presentation.name} is presenting in group ${groupData.name}`)
                    navigate('/presentation/edit/' + presentation.id + '/present')
                })
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
                    disabled={presentation.isPresenting || (mutatePresenting.isLoading)}
                >
                    { presentation.isPresenting && <CoPresentIcon sx={{fontSize: '50px'}} />}
                    { !presentation.isPresenting && <PlayCircleOutlineIcon sx={{fontSize: 50}} />}
                </IconButton>
            }
           
            <Divider orientation="vertical" flexItem />
            <div className={style['info-wrapper']}>
                <span className={style['card-tittle']} onClick={() => navigate('/presentation/edit/' + presentation.id)}>
                    {presentation.name} {presentation.isPresenting && <span className={style['card-present']}>- Presenting</span>}
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
