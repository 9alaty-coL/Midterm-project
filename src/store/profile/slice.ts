import { createSlice } from '@reduxjs/toolkit';

import { UserActions } from './dispatchers';

import { initialState, UserAdapter, State } from './state';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(UserActions.fetchUser.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(UserActions.fetchUser.fulfilled, (state, action) => {
      UserAdapter.addOne(state as State, action.payload)
      state.error = undefined;
      state.isLoading = false;
    })
    .addCase(UserActions.fetchUser.rejected, state => {
      state.error = 'Problem happened!',
      state.isLoading = false;
    })
});
