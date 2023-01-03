import { Question } from "src/models/question";
import { http } from "..";
import { IData } from "../dtos/data-dto";
import { QuestionDto } from "../dtos/question-dto";
import { questionMapper } from "../mappers/question.mapper";

const QUESTION_ROUTE = 'api/question'

export namespace QuestionApiService{
    export async function getQuestions(presentationId: string): Promise<Question[]> {
        const { data } = await http.get<IData<{ questions: QuestionDto[]}>>(QUESTION_ROUTE + '/' + presentationId);
        return data.data.questions.map(dto => questionMapper.fromDto(dto));
    }
}
