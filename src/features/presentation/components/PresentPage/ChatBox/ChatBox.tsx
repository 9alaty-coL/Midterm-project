import { memo, FC, useEffect } from 'react';
import { Box } from "../Box";
import style from "./ChatBox.module.css"
import css from "../Box.module.css"

import { ChatCard } from "./ChatCard/ChatCard"
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectIsMessageLoading, selectMessages } from 'src/store/message/selectors';
import { MessagesActions } from 'src/store/message/dispatchers';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { CircularProgress } from '@mui/material';

interface Props {
    side: "join" | "present",
    presentationId: string | undefined,
}

const ChatBoxComponent: FC<Props> = ({
    side,
    presentationId,
}) => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectMessages);
    const isMessagesLoading = useAppSelector(selectIsMessageLoading);
    const { setLastElement } = useInfiniteScroll(() => {
        if (presentationId) {
            dispatch(MessagesActions.fetchMoreMessages(presentationId))
        }
    });

    useEffect(() => {
        if (presentationId) {
            dispatch(MessagesActions.fetchMessages(presentationId))
        }
    }, [presentationId])

    if (presentationId == null) {
        return <span>Invalid presentation</span>
    }

    return (
        <Box type="chat" side={side} presentationId={presentationId}>
            <div className={style['messages']}>
            {
                messages.map((each, index) => {
                    if (index === messages.length - 1) {
                        return <ChatCard ref={setLastElement} key={index} sender={each.createdBy} time={each.timeAfterCreate} content={each.message}/>;
                    }
                    return <ChatCard key={index} sender={each.createdBy} time={each.timeAfterCreate} content={each.message}/>;
                })
            }
            { isMessagesLoading && <div className={style['circle']}><CircularProgress size={25}/></div>}
            </div>
        </Box>
    );
};

export const ChatBox = memo(ChatBoxComponent);
