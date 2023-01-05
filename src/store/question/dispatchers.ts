import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestionApiService } from 'src/api/services/question-api';
import { Question, PostQuestion } from 'src/models/question';

export namespace QuestionsActions {
  export const fetchQuestions = createAsyncThunk('questions/fetch', (presentationId: string) =>
    QuestionApiService.getQuestions(presentationId)
  );

  export const sendQuestion = createAsyncThunk('questions/send', (question: PostQuestion) =>
    QuestionApiService.sendQuestions(question)
  )

  export const markAsAnswered = createAsyncThunk('questions/mark', (questionId: string) =>
    QuestionApiService.markAsAnswered(questionId)
  )

  export const voteQuestion = createAsyncThunk('questions/vote', (data: VoteQuestion) =>
    QuestionApiService.voteQuestion(data.questionId, data.userId)
  )
}

interface VoteQuestion {
  questionId: string,
  userId: string | null,
}
