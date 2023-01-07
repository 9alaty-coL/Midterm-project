import { Slide } from 'src/models/slide';
import { SlideDto } from '../dtos/slide-dto';
import { answerMapper } from './answer.mapper';
import { IMapperFromDto } from './mappers';

class SlideMapper implements IMapperFromDto<SlideDto, Slide> {
  public fromDto(dto: SlideDto): Slide {
    return {
      id: dto._id,
      slideType: dto.slideType,
      question: dto.question,
      paragraph: dto.paragraph,
      subheading: dto.subheading,
      chartType: dto.chartType,
      answers: dto.answers.map(answerDto => answerMapper.fromDto(answerDto)),
      answeredUser: dto.answeredUser
    }
  }
}

export const slideMapper = new SlideMapper();
