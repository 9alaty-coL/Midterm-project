import { createEntityAdapter } from '@reduxjs/toolkit';
import { Question } from 'src/models/question';

export const questionAdapter = createEntityAdapter<Question>();

/** Questions state. */
export interface QuestionsState {

  /** Error. */
  readonly error?: string;

  /** Whether questions are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = questionAdapter.getInitialState<QuestionsState>({
  isLoading: false,
})

export type State = typeof initialState;
