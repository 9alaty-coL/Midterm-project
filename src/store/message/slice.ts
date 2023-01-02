import { createSlice } from '@reduxjs/toolkit';

import { MessagesActions } from './dispatchers';

import { initialState, messageAdapter, State } from './state';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
  },
  extraReducers: builder => builder
    .addCase(MessagesActions.fetchMessages.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(MessagesActions.fetchMessages.fulfilled, (state, action) => {
      messageAdapter.setAll(state as State, action.payload)
      state.error = undefined;
      state.isLoading = false;
    })
    .addCase(MessagesActions.fetchMoreMessages.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(MessagesActions.fetchMoreMessages.fulfilled, (state, action) => {
      messageAdapter.addMany(state as State, action.payload)
      state.error = undefined;
      state.isLoading = false;
    })
});
