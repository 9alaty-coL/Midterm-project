import { memo, FC } from 'react';

import {
    Avatar
} from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"

import style from './GroupAvatar.module.css';

interface Props {

    /** Group Avatar. */
    readonly image: string;
}

const GroupAvatarComponent: FC<Props> = ({ image }) => {
    return ( 
        <div className={style['group-avatar-wrapper']}>
            <div style={{backgroundImage: `url(${image})`}} className={style['avatar']}></div>       
            <div className={style['camera']} onClick={() => console.log('Set Group Avatar')}>
                <FontAwesomeIcon icon={faCamera} className={style["camera-icon"]}/>
            </div>
        </div>
    );
}
 
export const GroupAvatar = memo(GroupAvatarComponent);