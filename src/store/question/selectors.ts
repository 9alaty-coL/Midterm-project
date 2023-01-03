import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { questionAdapter } from './state';

const { selectAll } = questionAdapter.getSelectors();

/** Select questions. */
export const selectQuestions = createSelector(
  (state: RootState) => selectAll(state.questions),
  question => question
);

export const selectIsQuestionLoading = createSelector(
  (state: RootState) => state.questions.isLoading,
  isLoading => isLoading
);
