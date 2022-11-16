import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { postAdapter } from './state';

const { selectAll } = postAdapter.getSelectors();

/** Select posts. */
export const selectPosts = createSelector(
  (state: RootState) => selectAll(state.posts),
  post => post
);

export const selectIsPostLoading = createSelector(
  (state: RootState) => state.posts.isLoading,
  isLoading => isLoading
);
