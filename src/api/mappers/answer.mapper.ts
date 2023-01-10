import { Answer } from 'src/models/slide';
import { AnswerDto } from '../dtos/answer-dto';
import { IMapperFromDto } from './mappers';

export class AnswerMapper implements IMapperFromDto<AnswerDto, Answer> {
  private static instance: AnswerMapper;
  public fromDto(dto: AnswerDto): Answer {
  return {
      id: dto._id,
      answer: dto.answer,
      count: dto.count,
      answersList: dto.answersList
    }
  }

  public static getInstance(): AnswerMapper {
    if (!AnswerMapper.instance) {
        AnswerMapper.instance = new AnswerMapper();
    }
    return AnswerMapper.instance;
  }
}
