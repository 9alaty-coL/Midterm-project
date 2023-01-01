import { memo, FC, useState } from 'react';
import style from "./Box.module.css"

import { Paper, IconButton, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
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
        <Paper elevation={3} className={style['box-container']}>
            <Paper elevation={1} className={style['box-title']}>
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
                        placeholder={type === 'chat' ? "Enter your message" : "Enter your question"}/>      
                    <IconButton
                        onClick={() => {
                            
                        }}
                        >
                        <SendIcon style={{color: '#196cff', fontSize: '1.2em'}} />
                    </IconButton>
                </div>
            }
        </Paper>
    );
};

export const Box = BoxComponent;