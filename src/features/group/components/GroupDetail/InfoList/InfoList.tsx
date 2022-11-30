import { memo, FC } from 'react';
import style from './InfoList.module.css';

import { Button, Paper  } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserSlash } from "@fortawesome/free-solid-svg-icons"

import { useState, useEffect } from "react"

import { InfoCard } from "./InfoCard/InfoCard"
import { User } from 'src/models/user';

interface Props {

    /** Group. */
    readonly list: readonly User['id'][];

    /** Owner */
    readonly type: string;

    readonly allowEdit: boolean;

    readonly groupId: string;
}

const InfoListComponent: FC<Props> = ({
    list,
    type,
    allowEdit,
    groupId,
}) => {
    const [isOpenDeleting, setOpenDeleting] = useState<boolean>(false)
    const [checkedListID, setCheckedListID] = useState<string[]>([])

    useEffect(() => {
        if (!isOpenDeleting) {
            setCheckedListID([])
        }
    }, [isOpenDeleting]);

    return (
        <Paper elevation={2} className={style['list-container']}>
            <div className={style['list-header']}>
                <div className={style['list-title']}>{type === 'member' ? "Members" : "Co-Owner"}</div>
                {/* {
                    isOpenDeleting ?
                    <div className={style['list-btn-group']}>
                        <div className={style['btn-icon']}>Multiple removal</div>
                        <Button variant="contained" onClick={() => setOpenDeleting(false)} >Confirm</Button>
                        <Button variant="contained" onClick={() => setOpenDeleting(false)} color="error">Cancel</Button>
                    </div>
                    :
                    <Button variant="contained" onClick={() => setOpenDeleting(true)} disabled={!allowEdit}>
                        <FontAwesomeIcon icon={faUserSlash} className={style['btn-icon']}/>
                    </Button>
                } */}
            </div>
            <div className={style['list-body']}>
                {
                  list.length > 0 ?
                    list.map((member: User['id'], index: number) =>
                        <InfoCard groupId={groupId} disabled={!allowEdit} key={index} userId={member} type={type} isSelecting={isOpenDeleting}
                            checkedListID={checkedListID} setCheckedListID={setCheckedListID}
                        />
                    )
                    : 'Empty!'
                }
            </div>
        </Paper>
    );
}

export const InfoList = memo(InfoListComponent);
