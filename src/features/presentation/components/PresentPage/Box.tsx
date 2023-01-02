import { memo, FC, useState } from 'react';
import style from "./Box.module.css"

import { Paper, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import QuizIcon from '@mui/icons-material/Quiz';

const BoxComponent: FC<any> = ({
    type,
    side,
    sort, setSort,
    children
}) => {
    const [input, setInput] = useState("")

    return (
        <Paper elevation={6} className={style['box-container']}>
            <Paper elevation={1} className={style['box-title']} style={ type=== 'chat' ? {backgroundColor: '#89C4E1'} : {backgroundColor: '#ECE8DD'}}>
                {
                    type === 'chat' ? <>
                        <span><ChatIcon className={style['box-icon']} /> Chat Box</span>
                    </> : <>
                        <span><QuizIcon className={style['box-icon']} /> Question</span>
                        <FormControl size="small">
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                                value={sort}
                                onChange={(event: any) => setSort(event.target.value)}
                            >
                                <MenuItem value="unanswer">Unanswer</MenuItem>
                                <MenuItem value="answered">Answered</MenuItem>
                                <MenuItem value="vote">Total Vote</MenuItem>
                                <MenuItem value="time">Time Asked</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                }
            </Paper>
            <div className={style[(type === 'ques' && side === 'present') ? "box-content-high" : "box-content"]}>
                {children}
            </div>
            {
                (type === 'chat' || (type === 'ques' && side === 'join')) && <div className={style['box-send']}>
                    <input className={style['box-input']}
                        value={input} onChange={(event: any) => setInput(event.target.value)}
                        onKeyDown={(event: any) => { 
                            if (event.key === "Enter") {
                                console.log(input)
                                setInput("")
                            }
                        }}
                        placeholder={type === 'chat' ? "Enter your message" : "Enter your question"}/>      
                    <Button
                        onClick={() => {
                            
                        }}
                        variant="outlined"
                        style={{maxWidth: '3vw', maxHeight: '4vh', minWidth: '3vw', minHeight: '4vh', fontSize: 20}}
                        >
                        →
                    </Button>
                </div>
            }
        </Paper>
    );
};

export const Box = BoxComponent;