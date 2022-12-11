import { Slide } from 'src/models/slide';

export interface Presentation {
  readonly id: string;
  readonly name: string;
  readonly current: Slide['id'];
  readonly slides: Slide[];
}