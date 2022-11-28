import { memo, FC, useEffect } from 'react';

import { Button, Snackbar, Alert } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Group, Group as GroupItem } from 'src/models/group';
import style from './GroupInfo.module.css';

import { GroupAvatar } from './GroupAvatar/GroupAvatar';

import { useState } from "react"
import { User } from 'src/models/user';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectIsUserLoading, selectUser } from 'src/store/profile/selectors';
import { UserActions } from 'src/store/profile/dispatchers';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

interface Props {

    /** Group. */
    readonly group: Group;
}

const GroupInfoComponent: FC<Props> = ({ 
    group,
}) => {
    const [isOpenSnackbar, setOpenSnackbar] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const owner = useAppSelector(state => selectUser(state, group.ownerId))
    const isLoadingUser = useAppSelector(selectIsUserLoading);

    useEffect(() => {
        dispatch(UserActions.fetchUser(group.ownerId));
    }, [group.ownerId])

    if (isLoadingUser) {
        return <AppLoadingSpinner />
    }
    
    if (owner == null) {
        return <span>Owner not found</span>
    }

    return ( 
        <div className={style["group-info-container"]}>
            <GroupAvatar image={group.image} />
            <div className={style["info-wrapper"]}>
                <div className={style["title"]}>
                    {group.name}
                </div>
                <div className={style["content"]}><b>{1 + group.coOwnerId.length + group.memberId.length}</b> thành viên</div>
                <div className={style["content"]}><b>Owner:</b> {owner.firstName} {owner.lastName}</div>           
            </div>
            <div className={style['time-info-wrapper']}>
                <CopyToClipboard text={"https://group-master.vercel.app/group/join/" + group.id} 
                    onCopy={() => setOpenSnackbar(true)}>
                    <Button variant="contained" className={style['link-btn']} sx={{width: 40, height: 30}}>
                        <FontAwesomeIcon icon={faLink} className={style["icon"]}/>
                    </Button>
                </CopyToClipboard>
                {/* <div><b>Created At:</b> <br/>{group.createdAt}</div>
                <div><b>Updated At:</b> <br/>{group.updatedAt}</div> */}
            </div>
            <Snackbar open={isOpenSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Successfully copied to clipboard!
                </Alert>
            </Snackbar>
        </div>
    );
}
 
export const GroupInfo = memo(GroupInfoComponent);
