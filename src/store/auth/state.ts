import { LocalStorageService } from 'src/api/services/local-storage';
import { AppError } from 'src/models/app-error';

/** Auth state. */
export interface AuthState {

  /** Check user is logged in or not. */
  readonly isAuthorized: boolean;

  /** Whether isAuthorized is checking or not. */
  readonly isCheckingAuthorized: boolean;

  /** Error. */
  readonly error?: any;

  /** Whether authorization is loading or not. */
  readonly isLoading: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthorized: !!LocalStorageService.getSessionToken(),
  isCheckingAuthorized: true,
};
