import { memo, FC, useEffect } from 'react';
import style from './InfoCard.module.css';

import { Avatar, Button, Popover, MenuItem, Paper, Checkbox} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"
import { User } from 'src/models/user';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectIsUserLoading, selectUser } from 'src/store/profile/selectors';
import { UserActions } from 'src/store/profile/dispatchers';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { GroupApiService } from 'src/api/services/group-api';
import { group } from 'console';
import { useSnackbar } from 'notistack';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { GroupDetailsActions } from 'src/store/groupDetails/dispatchers';
import { NotificationApiService } from 'src/api/services/notification-api';
import { io, Socket } from 'socket.io-client';
import { NotificationsActions } from 'src/store/notification/dispatchers';

interface Props {
    /** Owner */
    readonly userId: User['id'];

    /** Type */
    readonly type: string;

    /** isSelecting */
    readonly isSelecting: boolean;

    /** checkedListID */
    readonly checkedListID: string[];

    /** setCheckedListID */
    readonly setCheckedListID: any;

    readonly groupId: string;

    readonly disabled: boolean;

    readonly disabledReAssign: boolean;

    readonly groupName: string;
}

const InfoCardComponent: FC<Props> = ({
    userId,
    type,
    isSelecting,
    groupId,
    checkedListID, setCheckedListID, disabled, disabledReAssign, groupName,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => selectUser(state, userId));
    const isLoadingUser = useAppSelector(selectIsUserLoading);
    const { enqueueSnackbar } = useSnackbar();
    const [socket, setSocket] = useState<Socket>();
    useEffect(() => {
      setSocket(io('http://localhost:8080/',  {transports: ['websocket']}))
    }, [])
    useEffect(() => {
        dispatch(UserActions.fetchUser(userId))
    }, [userId])


    if (isLoadingUser) {
        return <AppLoadingSpinner />;
    }

    if (user == null) {
        return <AppLoadingSpinner />
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleChangeCheckBox = () => {
        if (checkedListID.includes(user.id)) {
            setCheckedListID((prev :any) => prev.filter((each: any) => each !== user.id))
        }
        else {
            setCheckedListID((prev :any) => [...prev, user.id])
        }
    }

    return (
        <Paper elevation={2} className={style['card-container']}>
            {isSelecting && <Checkbox checked={checkedListID.includes(user.id)} onChange={() => handleChangeCheckBox()}/>}
            <Avatar alt="User Avatar" src={user.avatar} sx={{ width: 75, height: 75 }}/>
            <div className={style['card-content']}>
                <div className={style['card-name']}>{user.firstName} {user.lastName}</div>
                <div className={style['card-email']}>{user.email}</div>
            </div>
            {!isSelecting &&
            !disabled && <Button variant="contained" className={style['card-btn']}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}>
                <FontAwesomeIcon icon={faEllipsis} />
            </Button>
            }
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {type === 'member' && !disabledReAssign  && <MenuItem
                onClick={() => {
                  GroupApiService.assignMemberToCoOwner(userId, groupId)
                    .then(() => {
                      dispatch(GroupDetailsActions.fetchGroupDetails(groupId))
                      enqueueSnackbar('Assigned to co-owner successfully!', {variant: 'success'})
                    })
                    .then(() => {
                      NotificationApiService.notifyUser(userId, 'You have been assigned as co-owner in ' + groupName)
                    })
                    .then(() => {
                      socket?.emit("NotifyUser", userId, 'You have been assigned as co-owner in ' + groupName)
                    })
                    .catch(() => enqueueSnackbar('Problem happened. Please try again!', {variant: 'error'}))
                }}
                >Reassign role as co-owner</MenuItem>}
                {type === 'co-owner' && !disabledReAssign && <MenuItem
                  onClick={() => {
                    GroupApiService.assignCoOwnerToMember(userId, groupId)
                    .then(() => {
                      dispatch(GroupDetailsActions.fetchGroupDetails(groupId))
                      enqueueSnackbar('Assigned to member successfully!', {variant: 'success'})
                    })
                    .then(() => {
                      NotificationApiService.notifyUser(userId, 'You have been assigned as member in ' + groupName)
                    })
                    .then(() => {
                      socket?.emit("NotifyUser", userId, 'You have been assigned as member in ' + groupName)
                    })
                    .catch(() => enqueueSnackbar('Problem happened. Please try again!', {variant: 'error'}))
                  }}
                >Reassign role as member</MenuItem>}
                <MenuItem onClick={() => {
                  if (type === 'member') {
                    GroupApiService.removeMember(userId, groupId)
                      .then(() => {
                        dispatch(GroupDetailsActions.fetchGroupDetails(groupId))
                        enqueueSnackbar('Remove member successfully!', {variant: 'success'})
                      })
                      .then(() => {
                        NotificationApiService.notifyUser(userId, 'You have been removed from ' + groupName)
                      })
                      .then(() => {
                        socket?.emit("NotifyUser", userId, 'You have been removed from ' + groupName)
                      })
                      .catch(() => enqueueSnackbar('Problem happened. Please try again!', {variant: 'error'}))
                  } else if (type === 'co-owner') {
                    GroupApiService.removeCoOwner(userId, groupId)
                      .then(() => {
                        dispatch(GroupDetailsActions.fetchGroupDetails(groupId))
                        enqueueSnackbar('Remove co owner successfully!', {variant: 'success'})
                      })
                      .then(() => {
                        NotificationApiService.notifyUser(userId, 'You have been removed from ' + groupName)
                      })
                      .then(() => {
                        socket?.emit("NotifyUser", userId, 'You have been removed from ' + groupName)
                      })
                      .catch(() => enqueueSnackbar('Problem happened. Please try again!', {variant: 'error'}))
                  }
                }}>Remove from the group</MenuItem>
            </Popover>
        </Paper>
    );
}

export const InfoCard = memo(InfoCardComponent);
