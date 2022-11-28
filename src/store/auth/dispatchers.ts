import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthApi } from 'src/api/services/auth-api';
import { LocalStorageService } from 'src/api/services/local-storage';
import { RegisterFormValue } from 'src/features/auth/components/RegisterForm/register-form-settings';
import { Account } from 'src/models/account';
import { AppError } from 'src/models/app-error';
import { Token } from 'src/models/token';

export namespace AuthActions {
  export const login = createAsyncThunk<
    Token,
    Account,
    {
      rejectValue: AxiosError;
    }
  >('auth/login', async (account: Account, { rejectWithValue }) => {
    try {
      const token = await AuthApi.login(account);
      LocalStorageService.setLocalStorage(token.accessToken);
      return token;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error);
      }
      throw error;
    }
  });

  export const register = createAsyncThunk<
  void,
  RegisterFormValue,
  {
    rejectValue: AxiosError;
  }
>('auth/register', async (account: RegisterFormValue, { rejectWithValue }) => {
  try {
    const message = await AuthApi.register(account);
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error);
    }
    throw error;
  }
});
}
