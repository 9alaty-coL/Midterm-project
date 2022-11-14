import { createAction } from '@reduxjs/toolkit';
import { AppError } from 'src/models/app-error';
import { Login } from 'src/models/login-values';
import { User } from 'src/models/user';

export namespace AuthActions {
  export const loginUser = createAction<Login>('auth/login');

  export const loginSuccess = createAction<User>('auth/loginSuccess');

  export const loginFailure = createAction<AppError>('auth/loginFailure');

  export const logoutUser = createAction('auth/logout');

  export const logoutSuccess = createAction('auth/logoutSuccess');

  export const logoutFailure = createAction<AppError>('auth/logoutFailure');
}
