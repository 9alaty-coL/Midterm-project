import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostApiService } from 'src/api/services/post-api';

export namespace PostsActions {
  export const fetchPosts = createAsyncThunk('posts/fetch', () =>
    PostApiService.fetchPosts()
  );
}
