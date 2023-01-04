import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, PostMessage } from 'src/models/message';

import { MessagesActions } from './dispatchers';

import { initialState, messageAdapter, State } from './state';

const { selectAll } = messageAdapter.getSelectors()

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    pushMessage(state, action: PayloadAction<Message>) {
      messageAdapter.setAll(state as State, [action.payload , ...selectAll(state)])
    }
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
    .addCase(MessagesActions.sendMessage.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(MessagesActions.sendMessage.fulfilled, (state, action) => {
      // messageAdapter.setAll(state as State, [action.payload, ...selectAll(state)])
      state.error = undefined;
      state.isLoading = false;
    })
});

export const { pushMessage } = messagesSlice.actions;
