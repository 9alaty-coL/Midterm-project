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
}

const InfoCardComponent: FC<Props> = ({
    userId,
    type,
    isSelecting,
    checkedListID, setCheckedListID
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => selectUser(state, userId));
    const isLoadingUser = useAppSelector(selectIsUserLoading);

    useEffect(() => {
        dispatch(UserActions.fetchUser(userId))
    }, [userId])

    if (isLoadingUser) {
        return <AppLoadingSpinner />;
    }

    if (user == null) {
        return <span>User not found</span>
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
            <Button variant="contained" className={style['card-btn']}
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
                {type === 'member' && <MenuItem>Reassign role as co-owner</MenuItem>}
                {type === 'co-owner' && <MenuItem>Reassign role as member</MenuItem>}
                <MenuItem>Remove from the group</MenuItem>
            </Popover>

        </Paper>
    );
}
 
export const InfoCard = memo(InfoCardComponent);