import { memo, FC, useState } from 'react';
import style from "./PresentationCard.module.css"

import { Paper, Divider, IconButton, CircularProgress } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { useNavigate } from "react-router-dom"
import { Presentation } from 'src/models/presentation';
import { Answer, Slide } from 'src/models/slide';

const PresentationCardComponent: FC<any> = ({
    presentation,
    deleteHandler,
    type,
    isOwned
}) => {
    const navigate = useNavigate();

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
                if (true)
                    navigate('/presentation/edit/' + presentation.id + '/present')
                else 
                    navigate('/presentation/edit/' + presentation.id)
            }}>
                { type === 'public' && isOwned && <PlayCircleOutlineIcon sx={{fontSize: 50}} />}
                { type === 'public' && !isOwned && <DriveFileRenameOutlineIcon sx={{fontSize: 50}} />}
                { type === 'group' && <PlayCircleOutlineIcon sx={{fontSize: 50}} />}
                {/* { type === 'group' && !presentation.isPresent && <PlayCircleOutlineIcon sx={{fontSize: 50}} />}
                { type === 'group' && presentation.isPresent && <CoPresentIcon sx={{fontSize: 50}} />} */}
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
            <IconButton onClick={() => {deleteHandler(); setDeleting(true)}} disabled={isDeleting}> 
                {!isDeleting && <BackspaceIcon sx={{fontSize: 50}} />}
                {isDeleting && <CircularProgress sx={{fontSize: 50}}/>}
            </IconButton>
        </Paper>
    );
};

export const PresentationCard = memo(PresentationCardComponent);
