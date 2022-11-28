import { memo, FC } from 'react';

import { Button, Snackbar, Alert } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Group as GroupItem } from 'src/models/group';
import style from './GroupInfo.module.css';

import { GroupAvatar } from './GroupAvatar/GroupAvatar';

import { useState } from "react"

interface Props {

    /** Group. */
    readonly group: any;

    /** Owner */
    readonly owner: any;
}

const GroupInfoComponent: FC<Props> = ({ 
    group,
    owner
}) => {
    const [isOpenSnackbar, setOpenSnackbar] = useState<boolean>(false)

    return ( 
        <div className={style["group-info-container"]}>
            <GroupAvatar image={group.image} />
            <div className={style["info-wrapper"]}>
                <div className={style["title"]}>
                    {group.name}
                </div>
                <div className={style["content"]}><b>{1 + group.co_owner_id.length + group.member_id.length}</b> thành viên</div>
                <div className={style["content"]}><b>Owner:</b> {owner.firstname} {owner.lastname}</div>           
            </div>
            <div className={style['time-info-wrapper']}>
                <CopyToClipboard text={"https://group-master.vercel.app/group/join/" + group._id} 
                    onCopy={() => setOpenSnackbar(true)}>
                    <Button variant="contained" className={style['link-btn']} sx={{width: 40, height: 30}}>
                        <FontAwesomeIcon icon={faLink} className={style["icon"]}/>
                    </Button>
                </CopyToClipboard>
                <div><b>Created At:</b> <br/>{group.createdAt}</div>
                <div><b>Updated At:</b> <br/>{group.updatedAt}</div>
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
