import { memo, FC, useState, useEffect, useMemo } from 'react';
import { Question } from 'src/models/question';
import { useAppDispatch, useAppSelector } from 'src/store';
import { QuestionsActions } from 'src/store/question/dispatchers';
import { selectQuestions } from 'src/store/question/selectors';
import { Box } from "../Box";
import { QuestionCard } from "./QuestionCard/QuestionCard";

const QuestionBoxComponent: FC<any> = ({
    side,
    presentationId,
}) => {
    const questionData = useAppSelector(selectQuestions);
    const [sort, setSort] = useState('unanswer')
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState<Question[]>([]);

    useEffect(() => {
        setQuestion(questionData)
    }, [questionData])

    useEffect(() => {
        dispatch(QuestionsActions.fetchQuestions(presentationId))
    }, [presentationId])

    const compareAnswered = (a: Question, b: Question) => {
        if (!a.isAnswered && b.isAnswered) return 1;
        else if (a.isAnswered && !b.isAnswered) return -1;
        return 0;
    }
    const compareUnanswer = (a: Question, b: Question) => {
        if (a.isAnswered && !b.isAnswered) return 1;
        else if (!a.isAnswered && b.isAnswered) return -1;
        return 0;
    }
    const compareVote = (a: Question, b: Question) => {
        if (a.voteCount < b.voteCount) return 1;
        else if (a.voteCount > b.voteCount) return -1;
        return 0;
    }
    const compareTime = (a: Question, b: Question) => {
        if (a.createdAt > b.createdAt) return 1;
        else if (a.createdAt < b.createdAt) return -1;
        return 0;
    }

    useMemo(() => {
        switch(sort) {
            case "unanswer": question.sort(compareUnanswer); break;
            case "answered": question.sort(compareAnswered); break;
            case "vote": question.sort(compareVote); break;
            case "time": question.sort(compareTime); break;
        }
        setQuestion(question);
    }, [sort, question]);

    return (
        <Box presentationId={presentationId} type="ques" side={side} sort={sort} setSort={setSort}>
            {
                question.map((each, index) =>
                    <QuestionCard key={index} side={side}
                        sender={each.createdUserName} isAnswered={each.isAnswered} time={each.timeAfterCreate} vote={each.voteCount} content={each.description}/>)
            }
        </Box>
    );
};

export const QuestionBox = QuestionBoxComponent;
