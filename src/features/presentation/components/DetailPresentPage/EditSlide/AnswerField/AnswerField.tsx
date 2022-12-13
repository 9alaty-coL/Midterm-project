import { memo, FC } from 'react';
import style from "./AnswerField.module.css"

import { TextField, IconButton, InputAdornment } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
// import ImageIcon from '@mui/icons-material/Image';

const AnswerFieldComponent: FC<any> = ({
    index,
    answer,
    slidesControl
}) => {

    return (
        <div className={style['answer-container']}>
            <TextField 
                autoComplete='off'
                value={answer.answer} 
                onChange={(event: any) => slidesControl.editSlideAnswer(index, event.target.value)} sx={{ width: '23vw'}}/>
            {/* <IconButton> 
                <ImageIcon sx={{fontSize: 25, color: '#196cff'}}/>
            </IconButton> */}
            <IconButton onClick={() => slidesControl.deleteSlideAnswer(index)}> 
                <ClearIcon sx={{fontSize: 25, color: '#b7bac2'}}/>
            </IconButton>
        </div>
    );
};

export const AnswerField = memo(AnswerFieldComponent);