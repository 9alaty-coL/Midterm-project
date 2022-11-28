import { createSelector, EntityId } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { UserAdapter } from './state';

const { selectById } = UserAdapter.getSelectors();

/** Select user. */
export const selectUser = createSelector(
  (state: RootState, id: EntityId) => selectById(state.user, id),
  user => user
);

export const selectIsUserLoading = createSelector(
  (state: RootState) => state.user.isLoading,
  isLoading => isLoading
);

export const selectUserError = createSelector(
  (state: RootState) => state.user.error,
  error => error,
)
