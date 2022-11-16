import { AppError } from 'src/models/app-error';

/** Auth state. */
export interface AuthState {

  /** Check user is logged in or not. */
  readonly isAuthorized: boolean;

  /** Whether isAuthorized is checking or not. */
  readonly isCheckingAuthorized: boolean;

  /** Error. */
  readonly error?: AppError;

  /** Whether authorization is loading or not. */
  readonly isLoading: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthorized: false,
  isCheckingAuthorized: true,
};
