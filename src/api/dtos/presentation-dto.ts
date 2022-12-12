import { SlideDto } from './slide-dto';

export interface PresentationDto {
  readonly _id: string;
  readonly name: string;
  readonly currentSlide: SlideDto;
  readonly slides: readonly SlideDto[];
}