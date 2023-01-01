import { memo, FC } from 'react';
import style from "../../Card.module.css"
import { Card } from "@mui/material"

const ChatCardComponent: FC<any> = ({
    sender,
    time,
    content
}) => {

    return (
        <div className={style['card-container']}>
            <div className={style['card-label']}>
                <div className={style['card-sender']}>{sender}</div>
                <div className={style['card-time']}>{time}</div>
            </div>
            <div className={style['card-content']}>{content}</div>
        </div>
    );
};

export const ChatCard = memo(ChatCardComponent);