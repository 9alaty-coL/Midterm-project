import { useState } from "react"
import { Slide } from "src/models/slide";

var equal = require('deep-equal');

export const useChangeSlides = (initSlides: any) => {
    const [saveSlides, setSaveSlides] = useState(initSlides)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [slides, setSlides] = useState<any[]>(initSlides)

    return {
        slides: slides,
        currentSlide: slides[currentIndex],
        currentIndex: {
            number: currentIndex,
            setSlide: setCurrentIndex
        },
        isChange: () => equal(saveSlides, slides),
        // changeSlide: 
        initNewSlide: (newInitSlides: any[]) => {
            setSlides(newInitSlides)
            setSaveSlides(newInitSlides)
        },
        saveSlides: () => {
            setSaveSlides(slides)
        },
        addSlide: () => {
            setSlides([...slides, {
                id: '',
                question: 'New question?',
                answers: [
                    {answer: 'Answer A', count: 0},
                    {answer: 'Answer B', count: 0},
                    {answer: 'Answer C', count: 0}
                ]
            }])
        },
        deleteSlide: (index: number) => {
            let newSlides = slides;
            newSlides.splice(index - 1, 1);
            setSlides(newSlides);
        },
        
        // changeAnswerQuestion: 
        editSlideQuestion: (newQuestion: string) => {
            let newSlides = slides;
            newSlides[currentIndex - 1].question = newQuestion
            setSlides(newSlides)
        },
        addSlideAnswer: (answer: string) => {
            let newSlides = slides;
            newSlides[currentIndex - 1].answers = [...newSlides[currentIndex - 1].answers, answer];
            setSlides(newSlides);
        },
        editSlideAnswer: (indexAnswer: number, answer: string) => {
            let newSlides = slides;
            newSlides[currentIndex - 1].answers[indexAnswer - 1] = answer
            setSlides(newSlides)
        },
        deleteSlideAnswer: (indexAnswer: number) => {
            let newSlides = slides;
            newSlides[currentIndex - 1].splice(indexAnswer - 1, 1)
            setSlides(newSlides)
        }
        
    }
}