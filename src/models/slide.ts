export interface Answer {
  readonly id?: string;
  answer: string;
  count: number;
  answersList: any[];
}

export interface Slide {
  id?: string;
  slideType: string;
  question: string;
  paragraph: string;
  subheading: string;
  chartType: string;
  answers: Answer[];
  answeredUser: string[];
}
