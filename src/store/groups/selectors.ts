import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { groupAdapter } from './state';

const { selectAll } = groupAdapter.getSelectors();

/** Select groups. */
export const selectGroups = createSelector(
  (state: RootState) => selectAll(state.groups),
  group => group
);

export const selectIsGroupLoading = createSelector(
  (state: RootState) => state.groups.isLoading,
  isLoading => isLoading
);
