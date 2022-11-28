import { memo, FC } from 'react';
import style from './InfoCard.module.css';

import { Avatar, Button, Popover, MenuItem, Paper, Checkbox} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"

interface Props {
    /** Owner */
    readonly info: any;

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
    info,
    type,
    isSelecting,
    checkedListID, setCheckedListID
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleChangeCheckBox = () => {
        if (checkedListID.includes(info._id)) {
            setCheckedListID((prev :any) => prev.filter((each: any) => each !== info._id))
        }
        else {
            setCheckedListID((prev :any) => [...prev, info._id])
        }
    }

    return ( 
        <Paper elevation={2} className={style['card-container']}>
            {isSelecting && <Checkbox checked={checkedListID.includes(info._id)} onChange={() => handleChangeCheckBox()}/>}
            <Avatar alt="User Avatar" src={info.avatar} sx={{ width: 75, height: 75 }}/>
            <div className={style['card-content']}>
                <div className={style['card-name']}>{info.firstname} {info.lastname}</div>
                <div className={style['card-email']}>{info.email}</div>                
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