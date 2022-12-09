import { memo, FC } from 'react';
import style from "./NewCard.module.css"

import { Paper, Divider, IconButton } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const NewCardComponent: FC<any> = ({
    totalPresentation
}) => {

    //className={style['']}
    return (
        <div className={style['container']}>
            <span className={style['title']}>You has {totalPresentation} public presentation</span>
            <IconButton>
                <ControlPointIcon sx={{fontSize: 40}}/>
            </IconButton>
        </div>
    );
};

export const NewCard = memo(NewCardComponent);
