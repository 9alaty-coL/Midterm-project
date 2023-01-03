import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestionApiService } from 'src/api/services/question-api';
import { Question, PostQuestion } from 'src/models/question';

export namespace QuestionsActions {
  export const fetchQuestions = createAsyncThunk('questions/fetch', (presentationId: string) =>
    QuestionApiService.getQuestions(presentationId)
  );

  // export const sendQuestion = createAsyncThunk('questions/send', (question: PostQuestion) =>
  //   QuestionApiService.sendQuestion(question)
  // )
}
