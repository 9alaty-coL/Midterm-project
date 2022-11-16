import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthApi } from 'src/api/services/auth-api';
import { LocalStorageService } from 'src/api/services/local-storage';
import { AppError } from 'src/models/app-error';
import { Login } from 'src/models/login-values';
import { Token } from 'src/models/token';
import { User } from 'src/models/user';
import { authSlice } from './slice';

export namespace AuthActions {
  export const login = createAsyncThunk<
    Token,
    Login,
    {
      rejectValue: AppError;
    }
  >('auth/login', async (account: Login, { rejectWithValue }) => {
    try {
      return await AuthApi.login(account);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(new AppError(error.message));
      }
      throw error;
    }
  });
}
