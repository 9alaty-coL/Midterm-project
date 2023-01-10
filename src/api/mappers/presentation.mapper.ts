import { Presentation } from 'src/models/presentation';
import { PresentationDto } from '../dtos/presentation-dto';
import { IMapperFromDto } from './mappers';
import { slideMapper } from './slide.mapper';

export class PresentationMapper implements IMapperFromDto<PresentationDto, Presentation> {
  private static instance: PresentationMapper;
  public fromDto(dto: PresentationDto): Presentation {
    return {
      id: dto._id,
      name: dto.name,
      isPrivate: dto.isPrivate,
      isPresenting: dto.isPresenting,
      createdBy: dto.createdBy,
      groupId: dto.groupId,
      current: dto.currentSlide._id,
      slides: dto.slides.map(slideDto => slideMapper.fromDto(slideDto)),
      collaborators: dto.collaborators
    }
  } 
  public static getInstance(): PresentationMapper {
    if (!PresentationMapper.instance) {
        PresentationMapper.instance = new PresentationMapper();
    }
    return PresentationMapper.instance;
  }
}
