import { FC, forwardRef, memo } from "react";
import { Notification as Noti } from "src/models/notification";
import style from "./Notification.module.css";

interface Props {
    notification: Noti,
}

export const Notification = forwardRef<HTMLDivElement, Props>(({ notification }, ref) => {
    return <div ref={ref} className={`${style['notification']} ${notification.isRead ? '' : style['notification_unread']}`}>
        <span className={style['notification__content']}>
            {notification.content}
        </span>
        <span className={style['notification__time-ago']}>
            {notification.timeAfterCreate}
        </span>
        {!notification.isRead && <div className={style['dot']}></div>
        }
    </div>;
});
