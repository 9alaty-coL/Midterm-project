import { SagaIterator } from 'redux-saga';
import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { AppErrorMapper } from 'src/api/mappers/app-error.mapper';
import { AuthApi } from 'src/api/services/auth-api';
import { User } from 'src/models/user';
import { isApiError } from 'src/utils/axios-error-guard';

import { AuthActions } from './dispatchers';

/**
 * Worker saga which logs in the user.
 * @param action - Login action.
 */
function* loginUserWorker(action: ReturnType<typeof AuthActions.loginUser>): SagaIterator {
  try {
    const user: User = yield call(AuthApi.login, action.payload.email, action.payload.password);
    yield put(AuthActions.loginSuccess(user));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AuthActions.loginFailure(appError));
    }

    throw error;
  }
}

/** Worker saga which logs out the user. */
function* logoutUserWorker(): SagaIterator {
  try {
    yield put(AuthActions.logoutSuccess());
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AuthActions.logoutFailure(appError));
    }

    throw error;
  }
}

/** Watcher saga for auth. */
export function* authSaga(): SagaIterator {
  yield takeLatest(AuthActions.loginUser.type, loginUserWorker);
  yield takeLatest(AuthActions.logoutUser.type, logoutUserWorker);
}
