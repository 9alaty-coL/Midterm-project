export interface Answer {
  readonly answer: string;
  readonly count: number;
}

export interface Slide {
  readonly id: string;
  readonly question: string;
  readonly answers: readonly Answer[];
}