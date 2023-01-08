import { memo, FC, useState, useEffect } from 'react';
import style from "../EditSlide.module.css"

import { AnswerField } from '../AnswerField/AnswerField';

import { Tabs, Tab, Box } from "@mui/material"
import { TextField, Button, Paper } from "@mui/material"

import BarChartIcon from '@mui/icons-material/BarChart';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PieChartIcon from '@mui/icons-material/PieChart';

import { useQuery } from 'react-query';
import { PresentationApiService } from 'src/api/services/presentation-api';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';

import dateFormat, { masks } from "dateformat";

const AnswerCard = (props : any) => {
    return (
        <Paper elevation={2} sx={{padding: '5px', width: '95%'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div><b>{props.answer.name}</b></div>
                <div>{dateFormat(props.answer.answerdAt, "hh:MM dd/mm/yyyy")}</div>                
            </Box>
            <div>Submit: <i>{props.answer.answerContent}</i></div>
        </Paper>
    )
}

const MultiChoiceComponent: FC<any> = ({
    slidesControl,
    presentation,
    isChanged
}) => {
    const [tab, setTab] = useState(0)

    const { isLoading, isError, isSuccess, data: answersList, refetch } = useQuery<any>({
        queryKey: 'GetAnswerList_' + slidesControl.currentSlide.id + "_" + presentation.id,
        queryFn: 
            (presentation.isPrivate && slidesControl.currentSlide.slideType === 'multi' && !isChanged) ?
            PresentationApiService.getAnswersList.bind(null, {presentationId: presentation.id, slideId: slidesControl.currentSlide.id}):
            () => null,
        refetchOnWindowFocus: false
    })

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (tab === 1) refetch()
    }, [tab]);

    return (
        <>
            {
                presentation.isPrivate && <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={handleChange} sx={{width: '100%'}}>
                        <Tab sx={{width: "50%"}} label={<span style={{fontSize: 25}}>Question</span>}/>
                        <Tab sx={{width: "50%"}} label={<span style={{fontSize: 25}} >Answers</span>} disabled={isChanged}/>
                    </Tabs>
                </Box>
            }            
            {
                tab === 0 && <>
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
            }
            {
                tab === 1 && <>
                    {
                        isLoading && <AppLoadingSpinner />
                    }
                    {
                        isError && <h4>No answer was found</h4>
                    }
                    {
                        <Box sx={{display: 'flex', flexDirection: 'column', paddingTop: '5px', gap: '5px', alignItems: 'center', width: '100%'}}>
                            {
                                isSuccess &&
                                answersList.map((eachAnswer: any, index: number) => <AnswerCard answer={eachAnswer} key={index} />)
                            }
                        </Box>
                    }
                </>
            }
        </>
    );
};

export const MultiChoice = memo(MultiChoiceComponent);