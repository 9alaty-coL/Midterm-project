import { Presentation } from 'src/models/presentation';
import { PresentationDto } from '../dtos/presentation-dto';
import { IMapperFromDto } from './mappers';
import { slideMapper } from './slide.mapper';

class PresentationMapper implements IMapperFromDto<PresentationDto, Presentation> {
  public fromDto(dto: PresentationDto): Presentation {
    return {
      id: dto.data._id,
      name: dto.data.name,
      current: dto.data.currentSlide._id,
      slides: dto.data.slides.map(slideDto => slideMapper.fromDto(slideDto)),
    }
  } 
}