import { AnswerDto } from './answer-dto';

export interface SlideDto {
  readonly _id: string;
  readonly question: string;
  readonly answers: readonly AnswerDto[];
}