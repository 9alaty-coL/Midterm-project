import { memo, FC } from 'react';
import style from "../../Card.module.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Card } from "@mui/material"

const QuestionCardComponent: FC<any> = ({
    sender,
    isAnswered,
    time,
    vote,
    content
}) => {
    return (
        <div className={style['card-container']}>
            <div className={style['card-label']}>
                <div className={style[!isAnswered ? 'card-sender' : 'card-sender-answered']}>{sender} {isAnswered ? ' - answered' : ''}</div>
                <div className={style['card-time']}>{time}</div>
            </div>
            <div className={style[isAnswered ? 'card-question-answered' : 'card-question']}>
                <div className={style[isAnswered ? 'card-ques-answered' : 'card-ques']}>{content}</div>
                <button className={style['card-vote']}>
                    {vote}
                    <ThumbUpIcon fontSize="small"/>
                </button>
            </div>
        </div>
    );
};

export const QuestionCard = memo(QuestionCardComponent);