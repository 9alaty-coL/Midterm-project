import { memo, FC } from 'react';
import style from "./SlideCard.module.css"

import LoupeIcon from '@mui/icons-material/Loupe';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const NewSlideCardComponent: FC<any> = ({
    addSlide
}) => {

    return (
        <div className={style['card-container']} onClick={() => addSlide()}>
            <div className={style['index-wrapper']}>
                <LoupeIcon />
            </div>
            <div className={style['card-paper']}>
                <AddToPhotosIcon sx={{fontSize: 50}}/>
                <span className={style['card-text']}>New Slide</span>
            </div>
        </div>
    );
};

export const NewSlideCard = memo(NewSlideCardComponent);