import { Slide } from 'src/models/slide';

export interface Presentation {
  readonly id: string;
  readonly name: string;
  readonly isPrivate: boolean;
  readonly isPresenting: boolean;
  readonly createdBy: string;
  readonly groupId: string;
  readonly current: Slide['id'];
  readonly slides: Slide[];
  readonly collaborators: any[];
}