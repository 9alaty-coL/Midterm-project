import { createSlice } from '@reduxjs/toolkit';

import { GroupsActions } from './dispatchers';

import { initialState, groupAdapter, State } from './state';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(GroupsActions.fetchGroups.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(GroupsActions.fetchGroups.fulfilled, (state, action) => {
      groupAdapter.setAll(state as State, action.payload)
      state.error = undefined;
      state.isLoading = false;
    })
});
