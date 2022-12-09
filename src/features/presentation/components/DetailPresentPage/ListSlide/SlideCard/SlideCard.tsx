import { memo, FC, useState } from 'react';
import style from "./SlideCard.module.css"

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SlideCardComponent: FC<any> = ({
    index,
    slide,
    listControl,
    currentPresent
}) => {
    const [displayMore, setDisplayMore] = useState(false)

    return (
        <div className={style['card-container']} style={listControl.current === index ? {backgroundColor: "#d1e2ff"} : {backgroundColor: "white"}}
            onMouseEnter={() => setDisplayMore(true)}
            onMouseLeave={() => setDisplayMore(false)}
        >
            <div className={style['index-wrapper']}>
                <div className={style['index-play']}>
                    <span>{index}</span>
                    <PlayArrowIcon sx={{fontSize: 20, color: "#1a6cff"}} 
                        style={currentPresent === index ? {visibility: "visible"} : {visibility: "hidden"}}
                    />                    
                </div>
                <HighlightOffIcon sx={{fontSize: 20, color: "black"}} className={style['index-delete']}
                    style={displayMore ? {visibility: "visible"} : {visibility: "hidden"}}
                    onClick={() => listControl.deleteSlide(index)}
                />
            </div>
            <div className={style['card-paper']} onClick={() => listControl.setCurrent(index)}>
                <span>{slide.question}</span>
            </div>
        </div>
    );
};

export const SlideCard = memo(SlideCardComponent);