import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { messageAdapter } from './state';

const { selectAll } = messageAdapter.getSelectors();

/** Select messages. */
export const selectMessages = createSelector(
  (state: RootState) => selectAll(state.messages),
  message => message
);

export const selectIsMessageLoading = createSelector(
  (state: RootState) => state.messages.isLoading,
  isLoading => isLoading
);
