import { memo, FC } from 'react';
import style from "../../Card.module.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { QuestionApiService } from 'src/api/services/question-api';
import { useAppSelector } from 'src/store';
import { selectProfile } from 'src/store/profile/selectors';

const QuestionCardComponent: FC<any> = ({
    side,
    sender,
    isAnswered,
    time,
    vote,
    content,
    questionId,
    setUpdateQuestion,
}) => {
    const profile = useAppSelector(selectProfile)
    const questionBtnClick = () => {
        if (side === 'join') {
            QuestionApiService.voteQuestion(questionId, profile?.id ?? null)
                .then(question => {
                    setUpdateQuestion(question);
                })
        } else {
            QuestionApiService.markAsAnswered(questionId)
                .then(question => {
                    setUpdateQuestion(question);
                })
        }
    }
    return (
        <div className={style['card-container']}>
            <div className={style['card-label']}>
                <div className={style[!isAnswered ? 'card-sender' : 'card-sender-answered']}>{sender} {isAnswered ? ' - answered' : ''}</div>
                <div className={style['card-time']}>{time}</div>
            </div>
            <div className={style[isAnswered ? 'card-question-answered' : 'card-question']}>
                <div className={style[isAnswered ? 'card-ques-answered' : 'card-ques']}>{content}</div>
                <button className={style['card-vote']} disabled={isAnswered && side === 'present'} onClick={questionBtnClick}>
                    {vote}
                    {side === 'join' ? <ThumbUpIcon fontSize="small"/> : 
                        (!isAnswered ? <CheckCircleOutlineIcon fontSize="small"/>: <></>)}
                    
                </button>
            </div>
        </div>
    );
};

export const QuestionCard = memo(QuestionCardComponent);