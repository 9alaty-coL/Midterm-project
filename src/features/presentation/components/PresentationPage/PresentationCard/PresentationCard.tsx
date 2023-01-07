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

const PresentationCardComponent: FC<any> = ({
    presentation,
    deleteHandler,
    type,
    isOwned
}) => {
    const navigate = useNavigate();
    const [action, setAction] = useState("")

    // Check whether this presentation is presenting or not
    const { isLoading, data: isPresenting, refetch } = useQuery<boolean>({
        queryKey: 'IsPresenting' + presentation.id,
        queryFn: PresentationApiService.getIsPresenting.bind(null, presentation.id),
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            if (!data) {
                if (action === 'edit') {
                    setAction("")
                    navigate('/presentation/edit/' + presentation.id)
                }                    
                else if (action === 'present') {
                    setAction("")
                    mutatePresenting.mutate(presentation.id)
                }
            }
        }
    })

    // Push presenting status
    const mutatePresenting = useMutation(PresentationApiService.present)
    useEffect(() => {
        if (mutatePresenting.isSuccess) {
            navigate('/presentation/edit/' + presentation.id + '/present')
        }
    }, [mutatePresenting.isSuccess]);

    const [ isDeleting, setDeleting ] = useState(false)

    const countVoted = () => {
        return presentation.slides.reduce(
            (sum : number, slide: Slide) => sum + slide.answers.reduce(
                (voted : number, answer: Answer) => voted + answer.count
            , 0)
        , 0);
    }

    return (
        <Paper elevation={2} className={style['card-container']}>
            <IconButton onClick={() => {
                if ((type === 'public' && isOwned) || (type === 'group' && !presentation.isPresent) ) {
                    setAction("present")
                }                    
                else if (type === 'public' && !isOwned) {
                    setAction("edit")
                }
                else setAction("")
                refetch()
            }}
                sx={{color: '#82C3EC', width: '70px'}}
                disabled={isPresenting || isLoading}
            >
                { (mutatePresenting.isLoading || isLoading) && <CircularProgress sx={{fontSize: '50px'}}/>}
                { !mutatePresenting.isLoading && !isLoading && isPresenting && <CoPresentIcon sx={{fontSize: '50px'}} />}
                { !mutatePresenting.isLoading && !isLoading && ((type === 'public' && isOwned) || (type === 'group' && !presentation.isPresent)) && !isPresenting && <PlayCircleOutlineIcon sx={{fontSize: 50}} />}
                { !mutatePresenting.isLoading && !isLoading && type === 'public' && !isOwned && !isPresenting && <DriveFileRenameOutlineIcon sx={{fontSize: 50}} />}
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <div className={style['info-wrapper']}>
                <span className={style['card-tittle']} onClick={() => navigate('/presentation/edit/' + presentation.id)}>
                    {presentation.name}
                </span>
                <span className={style['card-text']}>{presentation.slides.length} slides</span>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={style['vote-wrapper']}>
                <span className={style['card-vote-text']}><b>{countVoted()}</b> voted</span>
            </div>
            <Divider orientation="vertical" flexItem />
            <IconButton onClick={() => {deleteHandler(); setDeleting(true)}} disabled={isDeleting || isPresenting || isLoading} sx={{color: '#EB455F', width: '70px'}}>
                {!isDeleting && <BackspaceIcon sx={{fontSize: '50px'}} />}
                {isDeleting && <CircularProgress sx={{fontSize: '50px'}}/>}
            </IconButton>
        </Paper>
    );
};

export const PresentationCard = memo(PresentationCardComponent);
