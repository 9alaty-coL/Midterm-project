import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageService } from 'src/api/services/local-storage';

import { AuthActions } from './dispatchers';

import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      LocalStorageService.removeSessionToken();
      state.isAuthorized = false;
    }
  },
  extraReducers: builder => builder
    .addCase(AuthActions.login.pending, state => {
      state.isLoading = true;
    })
    .addCase(AuthActions.login.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!!action.payload.accessToken) {
        state.isAuthorized = true;
      }
    })
    .addCase(AuthActions.login.rejected, (state, action) => {
      state.isLoading = false;
    })
    .addCase(AuthActions.register.pending, status => {
      status.isLoading = true;
    })
    .addCase(AuthActions.register.rejected, state => {
      state.isLoading = false;
    })
    .addCase(AuthActions.register.fulfilled, state => {
      state.isLoading = false;
    })
});

export const { logout } = authSlice.actions;
