import {
  configureStore, createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { authSlice } from './auth/slice';
import { postsSlice } from './posts/slice';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const immutableStateInvariantMiddleware = createImmutableStateInvariantMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
  },
  middleware: [
    sagaMiddleware,
    immutableStateInvariantMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
