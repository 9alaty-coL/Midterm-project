export interface Answer {
  readonly id: string;
  readonly answer: string;
  count: number;
}

export interface Slide {
  readonly id: string;
  readonly question: string;
  readonly answers: readonly Answer[];
}