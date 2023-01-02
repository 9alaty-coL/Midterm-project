import { memo, FC, useState } from 'react';
import style from "./SlideCard.module.css"

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faParagraph, faIndent } from '@fortawesome/free-solid-svg-icons';

const SlideCardComponent: FC<any> = ({
    index,
    slide,
    slidesControl,
    currentPresent
}) => {
    const [displayMore, setDisplayMore] = useState(false)

    let type = "multi"

    return (
        <div className={style['card-container']} 
            style={slidesControl.currentIndex.number === index ? {backgroundColor: "#d1e2ff"} : {backgroundColor: "white"}}
            onMouseEnter={() => setDisplayMore(true)}
            onMouseLeave={() => setDisplayMore(false)}
        >
            <div className={style['index-wrapper']}>
                <div className={style['index-play']}>
                    <span>{index}</span>
                    <PlayArrowIcon sx={{fontSize: 20, color: "#1a6cff"}} 
                        style={currentPresent === slide.id ? {visibility: "visible"} : {visibility: "hidden"}}
                    />
                </div>
                <HighlightOffIcon sx={{fontSize: 20, color: "black"}} className={style['index-delete']}
                    style={(displayMore && slidesControl.slides.length > 1) ? {visibility: "visible"} : {visibility: "hidden"}}
                    onClick={() => slidesControl.deleteSlide(index)}
                />
            </div>
            <div className={style['card-paper']} onClick={() => slidesControl.currentIndex.setSlide(index)}>
                { type === 'multi' && <FontAwesomeIcon icon={faChartPie} className={style['card-icon']}/>}
                { type === 'para' && <FontAwesomeIcon icon={faIndent} className={style['card-icon']}/>}
                { type === 'heading' && <FontAwesomeIcon icon={faParagraph} className={style['card-icon']}/>}
                
                <span>{slide.question}</span>
            </div>
        </div>
    );
};

export const SlideCard = memo(SlideCardComponent);