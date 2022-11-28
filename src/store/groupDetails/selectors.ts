import { createSelector, EntityId } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { groupDetailAdapter } from './state';

const { selectById } = groupDetailAdapter.getSelectors();

/** Select groups. */
export const selectGroupDetails = createSelector(
  (state: RootState, id: EntityId) => selectById(state.groupDetail, id),
  group => group
);

export const selectIsGroupDetailLoading = createSelector(
  (state: RootState) => state.groupDetail.isLoading,
  isLoading => isLoading
);

export const selectGroupDetailError = createSelector(
  (state: RootState) => state.groupDetail.error,
  error => error,
)
