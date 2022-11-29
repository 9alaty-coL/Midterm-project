import { createSlice } from '@reduxjs/toolkit';

import { GroupDetailsActions } from './dispatchers';

import { initialState, groupDetailAdapter, State } from './state';

export const groupDetailsSlice = createSlice({
  name: 'groupDetail',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(GroupDetailsActions.fetchGroupDetails.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(GroupDetailsActions.fetchGroupDetails.fulfilled, (state, action) => {
      groupDetailAdapter.addOne(state as State, action.payload)
      state.error = undefined;
      state.isLoading = false;
    })
    .addCase(GroupDetailsActions.fetchGroupDetails.rejected, state => {
      state.error = 'Problem happened!',
      state.isLoading = false;
    })
});
