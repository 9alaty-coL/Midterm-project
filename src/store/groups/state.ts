import { createEntityAdapter } from '@reduxjs/toolkit';
import { Group } from 'src/models/group';

export const groupAdapter = createEntityAdapter<Group>();

/** Groups state. */
export interface GroupsState {

  /** Error. */
  readonly error?: string;

  /** Whether groups are loading or not. */
  readonly isLoading: boolean;

  /** Whether is adding user or not. */
  readonly isAddingUser: boolean;
}

export const initialState = groupAdapter.getInitialState<GroupsState>({
  isLoading: false,
  isAddingUser: false,
})

export type State = typeof initialState;
