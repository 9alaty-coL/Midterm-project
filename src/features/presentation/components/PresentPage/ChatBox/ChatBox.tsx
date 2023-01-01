import { memo, FC, useState } from 'react';
import { Box } from "../Box";
import style from "./ChatBox.module.css"
import css from "../Box.module.css"

import { ChatCard } from "./ChatCard/ChatCard"

const ChatBoxComponent: FC<any> = ({
    side
}) => {
    const [message, setMessage] = useState([
        {
            'user': 'Alice',
            'time': '1/1/2023 01:30',
            'content': 'This is a test message'
        },
        {
            'user': 'Alice',
            'time': '1/1/2023 01:30',
            'content': 'This is a test message'
        },        {
            'user': 'Dori',
            'time': '1/1/2023 02:30',
            'content': 'This is a test message'
        },        {
            'user': 'Tea',
            'time': '1/1/2023 03:30',
            'content': 'This is a test message'
        },        {
            'user': 'Bla bla',
            'time': '1/1/2023 04:30',
            'content': 'This is a test message'
        },        {
            'user': 'Anonymus',
            'time': '1/1/2023 05:30',
            'content': 'This is a test message'
        },        {
            'user': 'Anonymus',
            'time': '1/1/2023 06:30',
            'content': 'These are test test test test test test test test test test test test test test test test test'
        },
    ])

    return (
        <Box type="chat" side={side}>
            {
                message.map((each: any, index: number) => <ChatCard key={index} sender={each.user} time={each.time} content={each.content}/>)
            }
        </Box>
    );
};

export const ChatBox = memo(ChatBoxComponent);
