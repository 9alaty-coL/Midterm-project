import { createEntityAdapter } from '@reduxjs/toolkit';
import { Notification } from 'src/models/notification';

export const notificationAdapter = createEntityAdapter<Notification>();

/** Notifications state. */
export interface NotificationsState {

  /** Error. */
  readonly error?: string;

  /** Whether notifications are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = notificationAdapter.getInitialState<NotificationsState>({
  isLoading: false,
})

export type State = typeof initialState;
