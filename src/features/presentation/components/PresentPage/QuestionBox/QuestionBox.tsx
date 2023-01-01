import { memo, FC, useState, useEffect } from 'react';
import { Box } from "../Box";
import { QuestionCard } from "./QuestionCard/QuestionCard";

const QuestionBoxComponent: FC<any> = ({
    side
}) => {
    const [question, setQuestion] = useState([
        {
            'user': 'Alice',
            'time': '1/1/2023 01:30',
            'content': 'This is a test message',
            'vote': 0,
            'isAnswered': false
        },
        {
            'user': 'Alice',
            'time': '1/1/2023 01:30',
            'content': 'This is a test message',
            'vote': 15,
            'isAnswered': false
        },        {
            'user': 'Dori',
            'time': '1/1/2023 02:30',
            'content': 'This is a test message',
            'vote': 5,
            'isAnswered': true
        },        {
            'user': 'Tea',
            'time': '1/1/2023 03:30',
            'content': 'This is a test message',
            'vote': 50,
            'isAnswered': true
        },        {
            'user': 'Bla bla',
            'time': '1/1/2023 04:30',
            'content': 'This is a test message',
            'vote': 1,
            'isAnswered': true
        },        {
            'user': 'Anonymus',
            'time': '1/1/2023 05:30',
            'content': 'This is a test message',
            'vote': 150,
            'isAnswered': false
        },        {
            'user': 'Anonymus',
            'time': '1/1/2023 06:30',
            'content': 'These are test test test test test test test test test test test test test test test test test',
            'vote': 999,
            'isAnswered': true
        },
    ])

    const [sort, setSort] = useState('unanswer')

    const compareAnswered = (a: any, b: any) => {
        if (a.isAnswered && !b.isAnswered) return 1;
        else if (!a.isAnswered && b.isAnswered) return -1;
        return 0;
    }
    const compareUnanswer = (a: any, b: any) => {
        if (!a.isAnswered && b.isAnswered) return 1;
        else if (a.isAnswered && !b.isAnswered) return -1;
        return 0;
    }
    const compareVote = (a: any, b: any) => {
        if (a.vote < b.vote) return 1;
        else if (a.vote > b.vote) return -1;
        return 0;
    }
    const compareTime = (a: any, b: any) => {
        if (a.vote > b.vote) return 1;
        else if (a.vote < b.vote) return -1;
        return 0;
    }

    useEffect(() => {
        switch(sort) {
            case "unanswer": question.sort(compareUnanswer); break;
            case "answered": question.sort(compareAnswered); break;
            case "vote": question.sort(compareVote); break;
            case "time": question.sort(compareTime); break;
        }
        setQuestion(question);
    }, [sort, question]);

    return (
        <Box type="ques" side={side} sort={sort} setSort={setSort}>
            {
                question.map((each: any, index: number) => 
                    <QuestionCard key={index} sender={each.user} isAnswered={each.isAnswered} time={each.time} vote={each.vote} content={each.content}/>)
            }
        </Box>
    );
};

export const QuestionBox = QuestionBoxComponent;