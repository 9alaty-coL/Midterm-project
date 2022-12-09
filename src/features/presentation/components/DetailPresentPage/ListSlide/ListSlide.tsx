import { memo, FC } from 'react';
import style from "./ListSlide.module.css"

import { SlideCard } from "./SlideCard/SlideCard"
import { NewSlideCard } from "./SlideCard/NewSlideCard"

const ListSlideComponent: FC<any> = ({
    presentation,
    listControl,
}) => {
    return (
        <div className={style['list-container']}>
            {
                presentation.slides.map((slide: any, index: number) => 
                    <SlideCard key={index} index={index + 1} slide={slide} listControl={listControl} currentPresent={presentation.current}/>
                )
            }
            <NewSlideCard addSlide={listControl.addSlide}/>
        </div>
    );
};

export const ListSlide = memo(ListSlideComponent);