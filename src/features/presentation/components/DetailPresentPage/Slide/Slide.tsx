import { memo, FC } from 'react';
import style from "./Slide.module.css"

const SlideComponent: FC<any> = ({

}) => {

    //className={style['']}
    return (
        <div className={style['slide-container']}>

        </div>
    );
};

export const Slide = memo(SlideComponent);