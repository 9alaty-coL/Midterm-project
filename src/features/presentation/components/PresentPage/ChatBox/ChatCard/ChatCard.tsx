import { memo, FC, forwardRef } from 'react';
import style from "../../Card.module.css"
import { Card } from "@mui/material"

export const ChatCard = forwardRef<HTMLDivElement, any>(({
    sender,
    time,
    content
}, ref) => {

    return (
        <div ref={ref} className={style['card-container']}>
            <div className={style['card-label']}>
                <div className={style['card-sender']}>{sender}</div>
                <div className={style['card-time']}>{time}</div>
            </div>
            <div className={style['card-content']}>{content}</div>
        </div>
    );
});