import { Question } from "src/models/question";
import { QuestionDto } from "../dtos/question-dto";
import { IMapperFromDto } from "./mappers";

class QuestionMapper implements IMapperFromDto<QuestionDto, Question> {
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
}

export const questionMapper = new QuestionMapper();