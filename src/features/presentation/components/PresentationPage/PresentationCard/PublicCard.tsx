import { memo, FC, useState, useEffect } from 'react';
import style from "./PresentationCard.module.css"

import { Paper, Divider, IconButton, CircularProgress } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BackspaceIcon from '@mui/icons-material/Backspace';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import { useNavigate } from "react-router-dom";
import { Answer, Slide } from 'src/models/slide';

import { useMutation } from 'react-query'
import { PresentationApiService } from 'src/api/services/presentation-api'

import isAbleToDelete from 'src/utils/isAbleToDelete';


const PublicCardComponent: FC<any> = ({
    presentation,
    deleteHandler,
    isOwned
}) => {
    const navigate = useNavigate();

    // Push presenting status
    const mutatePresenting = useMutation(PresentationApiService.present)
    useEffect(() => {
        if (mutatePresenting.isSuccess) {
            navigate('/presentation/edit/' + presentation.id + '/present')
        }
        else if (mutatePresenting.isError) {

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
                    disabled={presentation.isPresenting || (!mutatePresenting.isLoading && !isOwned)}
                >
                    { presentation.isPresenting && <CoPresentIcon sx={{fontSize: '50px'}} />}
                    { isOwned && <PlayCircleOutlineIcon sx={{fontSize: 50}} />}
                    { !isOwned && <DriveFileRenameOutlineIcon sx={{fontSize: 50}} />}
                </IconButton>
            }
           
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
            {
                isAbleToDelete(presentation) && <>
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

export const PublicCard = memo(PublicCardComponent);
