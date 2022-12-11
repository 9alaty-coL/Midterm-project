import { memo, FC } from 'react';
import style from "./NewCard.module.css"

import { Paper, Divider, IconButton } from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router-dom';

const NewCardComponent: FC<any> = ({
    totalPresentation,
    type
}) => {

    const navigate = useNavigate()

    //className={style['']}
    return (
        <div className={style['container']}>
            { type === "public" && <span className={style['title']}>You have {totalPresentation} public presentations</span> }
            { type === "group" &&  <span className={style['title']}>Your group has {totalPresentation} presentations</span> }
            <IconButton onClick={() => navigate('/presentation/new')}>
                <ControlPointIcon sx={{fontSize: 40}}/>
            </IconButton>
        </div>
    );
};

export const NewCard = memo(NewCardComponent);