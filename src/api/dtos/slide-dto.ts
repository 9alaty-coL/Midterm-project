import { AnswerDto } from './answer-dto';

export interface SlideDto {
  readonly _id?: string;
  readonly slideType: string;
  readonly question: string;
  readonly paragraph: string;
  readonly subheading: string;
  readonly chartType: string;
  readonly answers: readonly AnswerDto[];
  readonly answeredUser: string[];
}
