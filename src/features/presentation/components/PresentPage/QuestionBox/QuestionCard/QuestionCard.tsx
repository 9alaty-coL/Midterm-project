import { memo, FC } from 'react';
import style from "../../Card.module.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { QuestionApiService } from 'src/api/services/question-api';
import { useAppSelector } from 'src/store';
import { selectProfile } from 'src/store/profile/selectors';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

const CHECK_VOTE_KEY = 'CHECK_VOTED_KEY'

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
    const { enqueueSnackbar } = useSnackbar();
    const questionBtnClick = () => {
        if (side === 'join') {
            if (profile == null) {
                const votedQuestions = JSON.parse(localStorage.getItem(CHECK_VOTE_KEY) ?? '[]')
                if (votedQuestions?.includes(questionId)) {
                    enqueueSnackbar('This user already voted this question', {variant: 'error'})
                    return;
                }
                localStorage.setItem(CHECK_VOTE_KEY, JSON.stringify([...votedQuestions, questionId]))
            }
            QuestionApiService.voteQuestion(questionId, profile?.id ?? null)
                .then(question => {
                    setUpdateQuestion(question);
                })
                .catch(error => {
                    if (error instanceof AxiosError) {
                        enqueueSnackbar(error.response?.data.message, { variant: 'error' })
                        return;
                    }
                    enqueueSnackbar('Problem happen. Try again latter!', { variant: 'error' })
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