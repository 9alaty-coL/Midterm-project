import { PostQuestion, Question } from "src/models/question";
import { http } from "..";
import { IData } from "../dtos/data-dto";
import { QuestionDto } from "../dtos/question-dto";
import { questionMapper } from "../mappers/question.mapper";
import { ANONYMOUS_NAME } from './message-api';

const QUESTION_ROUTE = 'api/question'

export namespace QuestionApiService{
    export async function getQuestions(presentationId: string): Promise<Question[]> {
        const { data } = await http.get<IData<{ questions: QuestionDto[]}>>(QUESTION_ROUTE + '/' + presentationId);
        return data.data.questions.map(dto => questionMapper.fromDto(dto));
    }

    export async function sendQuestions(questionData: PostQuestion): Promise<Question> {
      const questionPost = {...questionData};
      if (questionPost.createdUserName == null) {
          let name = localStorage.getItem(ANONYMOUS_NAME);
          if (name == null) {
              name = `Anonymous ${Math.ceil(Math.random() * 1000)}`
              localStorage.setItem(ANONYMOUS_NAME, name);
          }
          questionPost.createdUserName = name;
      }
      const { data } = await http.post<IData<{QuestionSaved: QuestionDto}>>(QUESTION_ROUTE + '/' + 'add', questionMapper.toPostDto(questionPost));
      return questionMapper.fromDto(data.data.QuestionSaved);
    }
}
