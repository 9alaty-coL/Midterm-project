import { Answer } from 'src/models/slide';
import { AnswerDto } from '../dtos/answer-dto';
import { IMapperFromDto } from './mappers';

class AnswerMapper implements IMapperFromDto<AnswerDto, Answer> {
  public fromDto(dto: AnswerDto): Answer {
    return {
      id: dto._id,
      answer: dto.answer,
      count: dto.count,
    }
  }
}

export const answerMapper = new AnswerMapper();