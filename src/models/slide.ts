export interface Answer {
  readonly id?: string;
  answer: string;
  count: number;
}

export interface Slide {
  id?: string;
  question: string;
  answers: Answer[];
  chartType: string;
}
