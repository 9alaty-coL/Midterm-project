import { PostQuestion, Question } from "src/models/question";
import { PostQuestionDto, QuestionDto } from "../dtos/question-dto";
import { IMapperFromDto } from "./mappers";

export class QuestionMapper implements IMapperFromDto<QuestionDto, Question> {
    private static instance: QuestionMapper;
    fromDto(dto: QuestionDto): Question {
        return new Question({
            id: dto._id,
            createdAt: new Date(dto.createdAt),
            voteCount: dto.voteCount,
            votedUsers: dto.votedUsers,
            isAnswered: dto.isAnswered,
            description: dto.description,
            createdUserName: dto.createdUserName,
        })
    }

    toPostDto(data: PostQuestion): PostQuestionDto {
      return {
        description: data.description,
        presentationId: data.presentationId,
        createdUserName: data.createdUserName ?? '',
      }
    }
    public static getInstance(): QuestionMapper {
      if (!QuestionMapper.instance) {
          QuestionMapper.instance = new QuestionMapper();
      }
      return QuestionMapper.instance;
    }
}
