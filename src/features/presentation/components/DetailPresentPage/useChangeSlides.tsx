import { useState } from "react"
import { Slide } from "src/models/slide";

var equal = require('deep-equal');

export const useChangeSlides = (initSlides: any) => {
    const [savedSlides, setSavedSlides] = useState(JSON.parse(JSON.stringify(initSlides)))
    const [currentIndex, setCurrentIndex] = useState(1)
    const [slides, setSlides] = useState(JSON.parse(JSON.stringify(initSlides)))
    const [isNeedToPush, setNeedToPush] = useState(false)

    // Check changes
    const isChanged = () => {
        return !equal(savedSlides, slides)
    }

    // Change slide: 
    const initNewSlide = (newInitSlides: any) => {
        setSlides(JSON.parse(JSON.stringify(newInitSlides)))
        setSavedSlides(JSON.parse(JSON.stringify(newInitSlides)))
    }
    const cancelSlide = () => {
        setSlides(JSON.parse(JSON.stringify(savedSlides)))
    }
    const saveSlides = () => {
        setSavedSlides(JSON.parse(JSON.stringify(slides)))
        setNeedToPush(true)
    }
    const addSlide = () => {
        setSlides([...slides, {
            id: '',
            question: 'New question?',
            answers: [
                {answer: 'Answer A', count: 0},
                {answer: 'Answer B', count: 0},
                {answer: 'Answer C', count: 0}
            ]
        }])
    }
    const deleteSlide = (index: number) => {
        slides.splice(index - 1, 1);
        setSlides([...slides])
        if (currentIndex > index) {
            setCurrentIndex(currentIndex - 1)
        } 
    }

    // ChangeAnswerQuestion
    const editSlideQuestion = (newQuestion: string) => {
        slides[currentIndex - 1].question = newQuestion
        setSlides([...slides])
    }
    const addSlideAnswer = () => {
        slides[currentIndex - 1].answers = [...slides[currentIndex - 1].answers, {
            answer: '',
            count: 0
        }];
        setSlides([...slides]);
    }
    const editSlideAnswer = (indexAnswer: number, answer: string) => {
        slides[currentIndex - 1].answers[indexAnswer].answer = answer
        setSlides([...slides])
    }
    const deleteSlideAnswer = (indexAnswer: number) => {
        slides[currentIndex - 1].answers.splice(indexAnswer, 1)
        setSlides([...slides])
    }
    const editSlideChartType = (newChartType: string) => {
        slides[currentIndex - 1].chartType = newChartType
        setSlides([...slides])
    }

    const editSlideParagraph = (newParagraph: string) => {
        slides[currentIndex - 1].paragraph = newParagraph
        setSlides([...slides])
    }
    const editSlideSubheading = (newSubheading: string) => {
        slides[currentIndex - 1].subheading = newSubheading
        setSlides([...slides])
    }

    // ChangeSlideType
    const changeSlideType = (newSlideType: string) => {
        slides[currentIndex - 1].slideType = newSlideType
        setSlides([...slides])
    }

    return {
        // data
        slides: slides,
        currentSlide: slides[currentIndex - 1],
        currentIndex: {
            number: currentIndex,
            setSlide: setCurrentIndex
        },
        
        // check changes
        isChanged,
        // check push
        pushStatus: {
            isNeedToPush,
            setNeedToPush
        },

        // changeSlide: 
        initNewSlide,
        saveSlides,
        cancelSlide,
        addSlide,
        deleteSlide,
        
        // changeAnswerQuestion: 
        editSlideQuestion,
        addSlideAnswer,
        editSlideAnswer,
        deleteSlideAnswer,
        editSlideChartType,

        // change paragraph
        editSlideParagraph,

        // change sub heading
        editSlideSubheading,

        // changeSlideType
        changeSlideType
    }
}