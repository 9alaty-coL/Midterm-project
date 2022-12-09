import { memo, FC } from 'react';
import style from "./EditSlide.module.css"

const EditSlideComponent: FC<any> = ({

}) => {

    //className={style['']}
    return (
        <div className={style['edit-container']}>

        </div>
    );
};

export const EditSlide = memo(EditSlideComponent);