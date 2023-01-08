import { memo, FC, useState } from 'react';
import style from "./EditSlide.module.css"

import { FormControl, Select, MenuItem, Divider } from "@mui/material"

import { MultiChoice } from './Slide/MultiChoice'
import { Paragraph } from './Slide/Paragraph'
import { Heading } from './Slide/Heading'

const EditSlideComponent: FC<any> = ({
    slidesControl,
    presentation,
    isChanged
}) => {
    if (slidesControl.currentSlide === undefined) {
        return <div className={style['edit-container']}>No current slide is found</div>
    }

    return (
        <div className={style['edit-container']}>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Slide type: </span>
                <FormControl fullWidth>
                    <Select
                        value={slidesControl.currentSlide.slideType}
                        onChange={(event: any) => slidesControl.changeSlideType(event.target.value)}
                    >
                        <MenuItem value="multi">Multiple Choice</MenuItem>
                        <MenuItem value="para">Paragraph</MenuItem>
                        <MenuItem value="heading">Heading</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Divider orientation='horizontal' flexItem style={{marginTop: '20px'}}/>
            { slidesControl.currentSlide.slideType === 'multi' && <MultiChoice slidesControl={slidesControl} presentation={presentation} isChanged={isChanged}/> }
            { slidesControl.currentSlide.slideType === 'para' && <Paragraph slidesControl={slidesControl} /> }
            { slidesControl.currentSlide.slideType === 'heading' && <Heading slidesControl={slidesControl} /> }
        </div>
    );
};

export const EditSlide = memo(EditSlideComponent);