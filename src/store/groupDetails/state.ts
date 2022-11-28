import { createEntityAdapter } from '@reduxjs/toolkit';
import { Group } from 'src/models/group';

export const groupDetailAdapter = createEntityAdapter<Group>();

/** Group details state. */
export interface GroupDetailsState {

  /** Error. */
  readonly error?: string;

  /** Whether groups are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = groupDetailAdapter.getInitialState<GroupDetailsState>({
  isLoading: false,
})

export type State = typeof initialState;
