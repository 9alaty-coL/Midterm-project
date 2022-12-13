export interface Answer {
  answer: string;
  count: number;
}

export interface Slide {
  id?: string;
  question: string;
  answers: Answer[];
}