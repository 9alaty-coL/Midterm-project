import { memo, FC } from 'react';
import style from "../EditSlide.module.css"

import { TextField } from "@mui/material"

const HeadingComponent: FC<any> = ({
    slidesControl
}) => {
    return (
        <>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Heading: </span>
                <TextField
                    multiline
                    maxRows={3}
                    value={slidesControl.currentSlide.question}
                    onChange={(event: any) => slidesControl.editSlideQuestion(event.target.value)}
                />
            </div>
            <div className={style['edit-wrapper']}>
                <span className={style['edit-title']}>Subheading: </span>
                <TextField
                    multiline
                    maxRows={3}
                    value={slidesControl.currentSlide.question}
                    onChange={(event: any) => slidesControl.editSlideQuestion(event.target.value)}
                />
            </div>
        </>
    );
};

export const Heading = memo(HeadingComponent);