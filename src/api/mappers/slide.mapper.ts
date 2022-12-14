import { Slide } from 'src/models/slide';
import { SlideDto } from '../dtos/slide-dto';
import { answerMapper } from './answer.mapper';
import { IMapperFromDto } from './mappers';

class SlideMapper implements IMapperFromDto<SlideDto, Slide> {
  public fromDto(dto: SlideDto): Slide {
    return {
      id: dto._id,
      question: dto.question,
      answers: dto.answers.map(answerDto => answerMapper.fromDto(answerDto)),
      chartType: dto.chartType,
    }
  }
}

export const slideMapper = new SlideMapper();
