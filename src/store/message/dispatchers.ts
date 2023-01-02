import { createAsyncThunk } from '@reduxjs/toolkit';
import { MessageApiService } from 'src/api/services/message-api';
import { Message, PostMessage } from 'src/models/message';

export namespace MessagesActions {
  export const fetchMessages = createAsyncThunk('messages/fetch', (presentationId: string) =>
    MessageApiService.getMessageOfPresentation(presentationId)
  );

  export const fetchMoreMessages = createAsyncThunk('messages/fetchMore', (presentationId: string) =>
    MessageApiService.loadMoreMessages(presentationId)
  );

  export const sendMessage = createAsyncThunk('messages/send', (message: PostMessage) =>
    MessageApiService.sendMessage(message)
  )
}
