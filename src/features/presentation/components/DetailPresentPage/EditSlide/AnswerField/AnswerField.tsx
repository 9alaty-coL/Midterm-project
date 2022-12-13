import { memo, FC } from 'react';
import style from "./AnswerField.module.css"

import { TextField, IconButton, InputAdornment } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
// import ImageIcon from '@mui/icons-material/Image';

const AnswerFieldComponent: FC<any> = ({
    answer,
    editSlide
}) => {

    return (
        <div className={style['answer-container']}>
            <TextField value={answer.answer} sx={{ width: '23vw'}}/>
            {/* <IconButton> 
                <ImageIcon sx={{fontSize: 25, color: '#196cff'}}/>
            </IconButton> */}
            <IconButton> 
                <ClearIcon sx={{fontSize: 25, color: '#b7bac2'}}/>
            </IconButton>
        </div>
    );
};

export const AnswerField = memo(AnswerFieldComponent);