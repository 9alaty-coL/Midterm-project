import { createSlice } from '@reduxjs/toolkit';

import { QuestionsActions } from './dispatchers';

import { initialState, questionAdapter, State } from './state';

const { selectAll } = questionAdapter.getSelectors()

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
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
    // .addCase(QuestionsActions.sendQuestion.pending, state => {
    //   state.error = undefined;
    //   state.isLoading = true;
    // })
    // .addCase(QuestionsActions.sendQuestion.fulfilled, (state, action) => {
    //   questionAdapter.setAll(state as State, [action.payload, ...selectAll(state)])
    //   state.error = undefined;
    //   state.isLoading = false;
    // })
});
