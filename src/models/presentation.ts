import { Slide } from 'src/api/services/slide';

export interface Presentation {
  readonly id: string;
  readonly name: string;
  readonly current: number;
  readonly slides: readonly Slide[];
}