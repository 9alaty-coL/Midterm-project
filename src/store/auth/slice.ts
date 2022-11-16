import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageService } from 'src/api/services/local-storage';

import { AuthActions } from './dispatchers';

import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      LocalStorageService.removeSessionToken();
    }
  },
  extraReducers: builder => builder
    .addCase(AuthActions.login.pending, state => {
      state.isLoading = true;
    })
    .addCase(AuthActions.login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthorized = true;
    })
    .addCase(AuthActions.login.rejected, (state, action) => {
      state.error = action.payload;
    })
});

export const { logout } = authSlice.actions;
