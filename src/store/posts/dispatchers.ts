import { createAction } from '@reduxjs/toolkit';
import { AppError } from 'src/models/app-error';
import { Post } from 'src/models/post';

export namespace PostsActions {
  export const fetchPosts = createAction('posts/fetch');

  export const fetchPostsSuccess = createAction<Post[]>('posts/fetchSuccess');

  export const fetchPostsFailure = createAction<AppError>('posts/fetchFailure');

  export const cancelFetchPosts = createAction('posts/cancelFetch');
}
