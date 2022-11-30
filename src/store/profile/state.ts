import { createEntityAdapter } from '@reduxjs/toolkit';
import { User } from 'src/models/user';

export const UserAdapter = createEntityAdapter<User>();

/** User state. */
export interface UserState {

  readonly profile: User | null;

  /** Error. */
  readonly error?: string;

  /** Whether groups are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = UserAdapter.getInitialState<UserState>({
  profile: null,
  isLoading: false,
})

export type State = typeof initialState;
