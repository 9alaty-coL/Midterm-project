import { memo, FC } from 'react';
import style from "./ListSlide.module.css"

import { SlideCard } from "./SlideCard/SlideCard"
import { NewSlideCard } from "./SlideCard/NewSlideCard"

const ListSlideComponent: FC<any> = ({
    slidesControl,
    currentPresent
}) => {

    return (
        <div className={style['list-container']}>
            {
                slidesControl.slides.map((slide: any, index: number) => 
                    <SlideCard key={index} index={index + 1} slide={slide} slidesControl={slidesControl} currentPresent={currentPresent}/>
                )
            }
            <NewSlideCard addSlide={() => slidesControl.addSlide()}/>
        </div>
    );
};

export const ListSlide = memo(ListSlideComponent);