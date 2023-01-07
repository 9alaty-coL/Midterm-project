import { SlideDto } from './slide-dto';

export interface PresentationDto {
  readonly _id: string;
  readonly name: string;
  readonly isPrivate: boolean;
  readonly isPresenting: boolean;
  readonly createdBy: string;
  readonly groupId: string;
  readonly currentSlide: SlideDto;
  readonly slides: readonly SlideDto[];
  readonly collaborators: string[];
}