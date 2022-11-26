import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthApi } from 'src/api/services/auth-api';
import { LocalStorageService } from 'src/api/services/local-storage';
import { Account } from 'src/models/account';
import { AppError } from 'src/models/app-error';
import { Token } from 'src/models/token';

export namespace AuthActions {
  export const login = createAsyncThunk<
    Token,
    Account,
    {
      rejectValue: AppError;
    }
  >('auth/login', async (account: Account, { rejectWithValue }) => {
    try {
      const token = await AuthApi.login(account);
      LocalStorageService.setLocalStorage(token.accessToken);
      return token;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(new AppError(error.message));
      }
      throw error;
    }
  });
}
