import { AppError } from 'src/models/app-error';
import { User } from 'src/models/user';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;

  /** User. */
  readonly user: User | null;
}

export const initialState: AuthState = {
  isLoading: false,
  user: null,
};
