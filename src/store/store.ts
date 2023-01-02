import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook, useDispatch, useSelector,
} from 'react-redux';
import { authSlice } from './auth/slice';
import { groupDetailsSlice } from './groupDetails/slice';
import { groupsSlice } from './groups/slice';
import { messagesSlice } from './message/slice';
import { notificationsSlice } from './notification/slice';

import { postsSlice } from './posts/slice';
import { userSlice } from './profile/slice';

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    auth: authSlice.reducer,
    groups: groupsSlice.reducer,
    groupDetail: groupDetailsSlice.reducer,
    user: userSlice.reducer,
    notifications: notificationsSlice.reducer,
    messages: messagesSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    // We need to disable this check to allow ES6 classes in Redux.
    // You can find more info about this middleware in docs:
    // https://redux-toolkit.js.org/api/serializabilityMiddleware
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
