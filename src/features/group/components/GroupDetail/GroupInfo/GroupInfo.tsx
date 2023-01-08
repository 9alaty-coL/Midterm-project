import { memo, FC, useEffect } from 'react';

import { Modal, Box, Button, Snackbar, Alert, CircularProgress } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink, faDeleteLeft } from "@fortawesome/free-solid-svg-icons"

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Group, Group as GroupItem } from 'src/models/group';
import style from './GroupInfo.module.css';

import { GroupAvatar } from './GroupAvatar/GroupAvatar';

import { GroupApiService } from 'src/api/services/group-api'
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { useState } from "react"
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectIsUserLoading, selectUser, selectProfile } from 'src/store/profile/selectors';
import { UserActions } from 'src/store/profile/dispatchers';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

interface Props {

    /** Group. */
    readonly group: Group;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center'
};

const GroupInfoComponent: FC<Props> = ({ 
    group,
}) => {
    const navigate = useNavigate()

    const [isOpenSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const owner = useAppSelector(state => selectUser(state, group.ownerId))
    const profile = useAppSelector(selectProfile);
    const isLoadingUser = useAppSelector(selectIsUserLoading);

    useEffect(() => {
        dispatch(UserActions.fetchUser(group.ownerId));
    }, [group.ownerId])

    const deleteGroupPresentMutation = useMutation(GroupApiService.deleteGroup, {
        onSuccess: () => {
          navigate('/group')
        }
    })

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
            <div className={style['btn-info-wrapper']}>
                { profile !== null && profile.id === group.ownerId && 
                <Button variant="contained" className={style['delete-btn']} sx={{width: 40, height: 30}}
                    onClick={() => setOpen(true)}
                >
                    <FontAwesomeIcon icon={faDeleteLeft} className={style["icon"]}/>
                </Button>
                }
                <CopyToClipboard text={"https://group-master.vercel.app/group/join/" + group.id} 
                    onCopy={() => setOpenSnackbar(true)}>
                    <Button variant="contained" className={style['link-btn']} sx={{width: 40, height: 30}}>
                        <FontAwesomeIcon icon={faLink} className={style["icon"]}/>
                    </Button>
                </CopyToClipboard>
            </div>
            <Snackbar open={isOpenSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Successfully copied to clipboard!
                </Alert>
            </Snackbar>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={modalStyle}>
                    <span className={style['modal-title']}>Delete group confirmation</span>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexDirection: 'row'}}>
                        <Button variant="contained" 
                            onClick={() => {setOpen(false); }}>Cancel</Button>
                        <Button variant="contained" color="error" 
                            onClick={() => {setOpen(true); deleteGroupPresentMutation.mutate(group.id)}}>
                                {deleteGroupPresentMutation.isLoading && <CircularProgress />}
                                {deleteGroupPresentMutation.isError && <span>Error - Retry</span>}
                                {!deleteGroupPresentMutation.isError && !deleteGroupPresentMutation.isLoading && <span>Confirm</span>}
                            </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
 
export const GroupInfo = memo(GroupInfoComponent);
