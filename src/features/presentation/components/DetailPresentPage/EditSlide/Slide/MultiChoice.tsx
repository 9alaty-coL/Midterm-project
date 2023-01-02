import { memo, FC } from 'react';
import style from "../EditSlide.module.css"

import { AnswerField } from '../AnswerField/AnswerField';

import { TextField, Button } from "@mui/material"

import BarChartIcon from '@mui/icons-material/BarChart';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PieChartIcon from '@mui/icons-material/PieChart';

const MultiChoiceComponent: FC<any> = ({
    slidesControl
}) => {
    return (
        <>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Your question: </span>
                <TextField
                    multiline
                    maxRows={3}
                    value={slidesControl.currentSlide.question}
                    onChange={(event: any) => slidesControl.editSlideQuestion(event.target.value)}
                />
            </div>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Options: </span>
                {
                    slidesControl.currentSlide.answers.map(
                        (answer: any, index: number) => <AnswerField key={index} index={index} answer={answer} slidesControl={slidesControl}/>
                    )
                }
                <Button fullWidth variant="contained" color="info" sx={{fontSize: 20}}
                    onClick={() => slidesControl.addSlideAnswer()}
                >
                    New Option
                </Button>
            </div>
            <div className={style['edit-btn-container']}>
                <span className={style['edit-title']}>Result layout: </span>
                <div className={style['edit-btn-wrapper']}>
                    <button className={style['edit-btn']} onClick={() => slidesControl.editSlideChartType('bar')}>
                        <BarChartIcon style={{fontSize: '5vw'}}/>
                        <span className={style['edit-btn-text']}>Bars chart</span>
                    </button>
                    <button className={style['edit-btn']} onClick={() => slidesControl.editSlideChartType('donut')}>
                        <DataUsageIcon style={{fontSize: '5vw'}}/>
                        <span className={style['edit-btn-text']}>Donut chart</span>
                    </button>
                    <button className={style['edit-btn']} onClick={() => slidesControl.editSlideChartType('pie')}>
                        <PieChartIcon style={{fontSize: '5vw'}}/>
                        <span className={style['edit-btn-text']}>Pie chart</span>
                    </button>
                </div>
            </div>        
        </>
    );
};

export const MultiChoice = memo(MultiChoiceComponent);