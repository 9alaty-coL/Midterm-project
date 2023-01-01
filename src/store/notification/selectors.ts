import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { notificationAdapter } from './state';

const { selectAll } = notificationAdapter.getSelectors();

/** Select notifications. */
export const selectNotifications = createSelector(
  (state: RootState) => selectAll(state.notifications),
  notification => notification
);

export const selectIsNotificationLoading = createSelector(
  (state: RootState) => state.notifications.isLoading,
  isLoading => isLoading
);
