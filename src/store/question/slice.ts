import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from 'src/models/question';

import { QuestionsActions } from './dispatchers';

import { initialState, questionAdapter, State } from './state';

const { selectAll } = questionAdapter.getSelectors()

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    pushQuestion(state, action: PayloadAction<Question>) {
      questionAdapter.setAll(state as State, [action.payload, ...selectAll(state)])
    }
  },
  extraReducers: builder => builder
    .addCase(QuestionsActions.fetchQuestions.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(QuestionsActions.fetchQuestions.fulfilled, (state, action) => {
      questionAdapter.setAll(state as State, action.payload)
      state.error = undefined;
      state.isLoading = false;
    })
    .addCase(QuestionsActions.sendQuestion.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(QuestionsActions.sendQuestion.fulfilled, (state, action) => {
      // questionAdapter.setAll(state as State, [action.payload, ...selectAll(state)])
      state.error = undefined;
      state.isLoading = false;
    })
});

export const { pushQuestion } = questionsSlice.actions
