import { memo, FC } from 'react';
import style from "./EditSlide.module.css"

import { AnswerField } from './AnswerField/AnswerField';

import { TextField, Button } from "@mui/material"

import BarChartIcon from '@mui/icons-material/BarChart';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PieChartIcon from '@mui/icons-material/PieChart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

const EditSlideComponent: FC<any> = ({
    slide,
    editSlide
}) => {

    //className={style['']}
    return (
        <div className={style['edit-container']}>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Your question: </span>
                <TextField
                    multiline
                    maxRows={3}
                    value={slide.question}
                    onChange={(event: any) => editSlide({...slide, question: event.target.value})}
                />
            </div>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Options: </span>
                {
                    slide.answers.map(
                        (answer: any, index: number) => <AnswerField answer={answer} editSlide={editSlide}/>
                    )
                }
                <Button fullWidth variant="contained" color="info" sx={{fontSize: 20}}>New Option</Button>
            </div>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Image: </span>
                <TextField
                    // value={value}
                    // onChange={handleChange}
                    type="file"
                />
            </div>
            <div className={style['edit-btn-container']}>
                <span className={style['edit-title']}>Result layout: </span>
                <div className={style['edit-btn-wrapper']}>
                    <button className={style['edit-btn']}>
                        <BarChartIcon style={{fontSize: 70}}/>
                        <span className={style['edit-btn-text']}>Bars chart</span>
                    </button>
                    <button className={style['edit-btn']}>
                        <DataUsageIcon style={{fontSize: 70}}/>
                        <span className={style['edit-btn-text']}>Donut chart</span>
                    </button>
                    <button className={style['edit-btn']}>
                        <PieChartIcon style={{fontSize: 70}}/>
                        <span className={style['edit-btn-text']}>Pie chart</span>
                    </button>
                    <button className={style['edit-btn']}>
                        <BubbleChartIcon style={{fontSize: 70}}/>
                        <span className={style['edit-btn-text']}>Dots chart</span>
                    </button>
                </div>
            </div>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Extra: </span>
            </div>
        </div>
    );
};

export const EditSlide = memo(EditSlideComponent);