import { memo, FC } from 'react';
import { DetailSlide } from '../../DetailSlide/DetailSlide';
import style from "./MainSlide.module.css"

const MainSlideComponent: FC<any> = ({
    slidesControl
}) => {
    return (
        <div className={style['slide-container']}>
            <DetailSlide slide={slidesControl.currentSlide}/>
        </div>
    );
};

export const MainSlide = MainSlideComponent;