import { createSlice } from '@reduxjs/toolkit';

import { PostsActions } from './dispatchers';

import { initialState } from './state';

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(PostsActions.fetchPosts, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(PostsActions.fetchPostsSuccess, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    })
    .addCase(PostsActions.fetchPostsFailure, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(PostsActions.cancelFetchPosts, state => {
      state.error = undefined;
      state.isLoading = false;
    }),
});
