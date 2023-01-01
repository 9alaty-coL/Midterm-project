import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationApiService } from 'src/api/services/notification-api';
import { Notification } from 'src/models/notification';

export namespace NotificationsActions {
  export const fetchNotifications = createAsyncThunk('notifications/fetch', () =>
    NotificationApiService.getNotifications()
  );

  export const fetchMoreNotifications = createAsyncThunk('notifications/fetchMore', () =>
    NotificationApiService.loadMoreNotifications()
  );
}
