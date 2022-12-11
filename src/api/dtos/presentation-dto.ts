import { SlideDto } from './slide-dto';

export interface PresentationDto {
  readonly status: string;
  readonly data: {
    readonly _id: string;
    readonly name: string;
    readonly currentSlide: SlideDto;
    readonly slides: readonly SlideDto[];
  }
}