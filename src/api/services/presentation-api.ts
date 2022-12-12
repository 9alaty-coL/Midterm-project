import { Presentation } from 'src/models/presentation'
import { Slide } from 'src/models/slide'
import { http } from '..'
import { IData } from '../dtos/data-dto'
import { PresentationDto } from '../dtos/presentation-dto'
import { presentationMapper } from '../mappers/presentation.mapper'

const mocks: Presentation[] = [
    {
        id: '1',
        name: 'Presentation about fruit',
        current: '1',
        slides: [
            {
                id: '1',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 5},
                ],
            },
            {
                id: '2',
                question: 'Where does the Rambutan come from?',
                answers: [
                    {answer: 'Europe', count: 3},
                    {answer: 'Africa', count: 2},
                    {answer: 'Asia', count: 2},
                ],
            },
            {
                id: '3',
                question: 'What country is the largest producer of kiwi fruit?',
                answers: [
                    {answer: 'Italy', count: 2},
                    {answer: 'China', count: 2},
                    {answer: 'New Zealand', count: 0},
                    {answer: 'USA', count: 5},
                    {answer: 'Japan', count: 4}
                ],
            },
            {
                id: '4',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 5}
                ],
            },
            {
                id: '5',
                question: 'What is the most consumed fruit in the world?',
                answers: [
                    {answer: 'Apple', count: 1},
                    {answer: 'Banana', count: 2},
                    {answer: 'Peach', count: 2},
                    {answer: 'Pear', count: 1}
                ],
            }
        ]
    },
    {
        id: '2',
        name: 'Presentation about fruit 2',
        current: '7',
        slides: [
            {
                id: '6',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 1},
                    {answer: 'Yellow', count: 5}
                ],
            },
            {
                id: '7',
                question: 'Where does the Rambutan come from?',
                answers: [
                    {answer: 'Europe', count: 3},
                    {answer: 'Africa', count: 2},
                    {answer: 'Asia', count: 2}
                ],
            },
            {
                id: '8',
                question: 'What country is the largest producer of kiwi fruit?',
                answers: [
                    {answer: 'Italy', count: 2},
                    {answer: 'China', count: 2},
                    {answer: 'New Zealand', count: 0},
                    {answer: 'USA', count: 2},
                    {answer: 'Japan', count: 4}
                ],
            },
            {
                id: '9',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 5}
                ],
            },
            {
                id: '11',
                question: 'What is the most consumed fruit in the world?',
                answers: [
                    {answer: 'Apple', count: 1},
                    {answer: 'Banana', count: 2},
                    {answer: 'Peach', count: 2},
                    {answer: 'Pear', count: 1}
                ],
            }
        ]
    },
    {
        id: '3',
        name: 'Presentation about fruit 3333',
        current: '44',
        slides: [
            {
                id: '21',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 5}
                ],
            },
            {
                id: '13',
                question: 'Where does the Rambutan come from?',
                answers: [
                    {answer: 'Europe', count: 3},
                    {answer: 'Africa', count: 2},
                    {answer: 'Asia', count: 2}
                ],
            },
            {
                id: '44',
                question: 'What country is the largest producer of kiwi fruit?',
                answers: [
                    {answer: 'Italy', count: 2},
                    {answer: 'China', count: 4},
                    {answer: 'New Zealand', count: 0},
                    {answer: 'USA', count: 5},
                    {answer: 'Japan', count: 4}
                ],
            },
            {
                id: '55',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 4}
                ],
            },
            {
                id: '66',
                question: 'What is the most consumed fruit in the world?',
                answers: [
                    {answer: 'Apple', count: 1},
                    {answer: 'Banana', count: 2},
                    {answer: 'Peach', count: 2},
                    {answer: 'Pear', count: 1}
                ],
            }
        ]
    },
    {
        id: '4',
        name: 'Presentation 44444444444444 fruit',
        current: '222',
        slides: [
            {
                id: '77',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 5}
                ],
            },
            {
                id: '88',
                question: 'Where does the Rambutan come from?',
                answers: [
                    {answer: 'Europe', count: 0},
                    {answer: 'Africa', count: 0},
                    {answer: 'Asia', count: 0}
                ],
            },
            {
                id: '99',
                question: 'What country is the largest producer of kiwi fruit?',
                answers: [
                    {answer: 'Italy', count: 2},
                    {answer: 'China', count: 2},
                    {answer: 'New Zealand', count: 0},
                    {answer: 'USA', count: 5},
                    {answer: 'Japan', count: 4}
                ],
            },
            {
                id: '111',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 5}
                ],
            },
            {
                id: '222',
                question: 'What is the most consumed fruit in the world?',
                answers: [
                    {answer: 'Apple', count: 1},
                    {answer: 'Banana', count: 2},
                    {answer: 'Peach', count: 2},
                    {answer: 'Pear', count: 1}
                ],
            }
        ]
    },
    {
        id: '5',
        name: 'Presentation 5? fruit',
        current: '333',
        slides: [
            {
                id: '333',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 13},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 5}
                ],
            },
            {
                id: '444',
                question: 'Where does the Rambutan come from?',
                answers: [
                    {answer: 'Europe', count: 3},
                    {answer: 'Africa', count: 2},
                    {answer: 'Asia', count: 12}
                ],
            },
            {
                id: '555',
                question: 'What country is the largest producer of kiwi fruit?',
                answers: [
                    {answer: 'Italy', count: 2},
                    {answer: 'China', count: 2},
                    {answer: 'New Zealand', count: 0},
                    {answer: 'USA', count: 5},
                    {answer: 'Japan', count: 14}
                ],
            },
            {
                id: '666',
                question: 'What colour is the Mangosteen?',
                answers: [
                    {answer: 'Orange', count: 3},
                    {answer: 'Blue', count: 2},
                    {answer: 'Purple', count: 0},
                    {answer: 'Yellow', count: 5}
                ],
            },
            {
                id: '123123',
                question: 'What is the most consumed fruit in the world?',
                answers: [
                    {answer: 'Apple', count: 1},
                    {answer: 'Banana', count: 12},
                    {answer: 'Peach', count: 2},
                    {answer: 'Pear', count: 1}
                ],
            }
        ]
    }
]

const PRESENTATION_ROUTE = 'api/presentation'

export namespace PresentationApiService {
  export async function getPresentations(): Promise<Presentation[]> {
    const { data } = await http.get<IData<{ presentations: PresentationDto[] }>>(PRESENTATION_ROUTE + '/all')
    return data.data.presentations.map(dto => presentationMapper.fromDto(dto))
  }

  export async function getPresentationById(id: string): Promise<Presentation> {
    const { data } = await http.get<IData<{ presentation: PresentationDto }>>(PRESENTATION_ROUTE + '/' + id)
    return presentationMapper.fromDto(data.data.presentation);
  }

  export async function changePresentationSlide(currentSlideId: Slide['id'], presentationId: Presentation['id']): Promise<Presentation> {
    const { data } = await http.patch<IData<{ updatedPresentation: PresentationDto}>>(PRESENTATION_ROUTE + '/currentSlide', {
        currSlideId: currentSlideId,
        presentationId,
    })
    return presentationMapper.fromDto(data.data.updatedPresentation);
  }

  export async function addPresentation(): Promise<any[]> {
    return mocks
  }

  export async function createPresentation(): Promise<void> {
    return
  }

  export async function removePresentation(): Promise<void> {
    return
  }
}
