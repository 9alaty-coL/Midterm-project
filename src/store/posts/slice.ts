import { createSlice } from '@reduxjs/toolkit';

import { PostsActions } from './dispatchers';

import { initialState, postAdapter, State } from './state';

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(PostsActions.fetchPosts.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(PostsActions.fetchPosts.fulfilled, (state, action) => {
      postAdapter.setAll(state as State, action.payload)
      state.error = undefined;
      state.isLoading = true;
    })
});
