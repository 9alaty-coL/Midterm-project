import { createEntityAdapter } from '@reduxjs/toolkit';
import { AppError } from 'src/models/app-error';
import { Post } from 'src/models/post';

export const postAdapter = createEntityAdapter<Post>();

/** Posts state. */
export interface PostsState {

  /** Error. */
  readonly error?: string;

  /** Whether posts are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = postAdapter.getInitialState<PostsState>({
  isLoading: false,
})

export type State = typeof initialState;
