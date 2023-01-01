import { createSlice } from '@reduxjs/toolkit';

import { NotificationsActions } from './dispatchers';

import { initialState, notificationAdapter, State } from './state';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
  },
  extraReducers: builder => builder
    .addCase(NotificationsActions.fetchNotifications.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(NotificationsActions.fetchNotifications.fulfilled, (state, action) => {
      notificationAdapter.setAll(state as State, action.payload)
      state.error = undefined;
      state.isLoading = false;
    })
    .addCase(NotificationsActions.fetchMoreNotifications.pending, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(NotificationsActions.fetchMoreNotifications.fulfilled, (state, action) => {
      notificationAdapter.addMany(state as State, action.payload)
      state.error = undefined;
      state.isLoading = false;
    })
});
