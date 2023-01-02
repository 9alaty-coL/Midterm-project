import { createEntityAdapter } from '@reduxjs/toolkit';
import { Message } from 'src/models/message';

export const messageAdapter = createEntityAdapter<Message>();

/** Messages state. */
export interface MessagesState {

  /** Error. */
  readonly error?: string;

  /** Whether messages are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = messageAdapter.getInitialState<MessagesState>({
  isLoading: false,
})

export type State = typeof initialState;
