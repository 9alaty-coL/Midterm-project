import { memo, FC } from 'react';
import style from "./PresentationCard.module.css"

import { Paper, Divider, IconButton } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import { useNavigate } from "react-router-dom"
import { Presentation } from 'src/models/presentation';
import { Answer, Slide } from 'src/models/slide';

interface Props {
    readonly presentation: Presentation;
}

const PresentationCardComponent: FC<Props> = ({
    presentation
}) => {
    const navigate = useNavigate();

    const countVoted = () => {
        return presentation.slides.reduce(
            (sum : number, slide: Slide) => sum + slide.answers.reduce(
                (voted : number, answer: Answer) => voted + answer.count
            , 0)
        , 0);
    }

    return (
        <Paper elevation={2} className={style['card-container']}>
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
            <IconButton onClick={() => console.log("public presentation " + presentation.name)}>
                <PlayCircleOutlineIcon sx={{fontSize: 50}}/>
            </IconButton>
        </Paper>
    );
};

export const PresentationCard = memo(PresentationCardComponent);
