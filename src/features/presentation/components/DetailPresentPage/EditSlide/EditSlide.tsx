import { memo, FC, useState } from 'react';
import style from "./EditSlide.module.css"

import { FormControl, Select, MenuItem, Divider } from "@mui/material"

import { MultiChoice } from './Slide/MultiChoice'
import { Paragraph } from './Slide/Paragraph'
import { Heading } from './Slide/Heading'

const EditSlideComponent: FC<any> = ({
    slidesControl
}) => {
    if (slidesControl.currentSlide === undefined) {
        return <div className={style['edit-container']}></div>
    }

    // Temp state
    const [slideType, setSlideType] = useState("multi")
    // End temp

    return (
        <div className={style['edit-container']}>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Slide type: </span>
                <FormControl fullWidth>
                    <Select
                        value={slideType}
                        onChange={(event: any) => setSlideType(event.target.value)}
                    >
                        <MenuItem value="multi">Multiple Choice</MenuItem>
                        <MenuItem value="para">Paragraph</MenuItem>
                        <MenuItem value="heading">Heading</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Divider orientation='horizontal' flexItem style={{marginTop: '20px'}}/>
            { slideType === 'multi' && <MultiChoice slidesControl={slidesControl} /> }
            { slideType === 'para' && <Paragraph slidesControl={slidesControl} /> }
            { slideType === 'heading' && <Heading slidesControl={slidesControl} /> }
        </div>
    );
};

export const EditSlide = memo(EditSlideComponent);