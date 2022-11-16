import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects authorization loading state. */
export const selectIsAuthLoading = createSelector(
  (state: RootState) => state.auth.isLoading,
  isLoading => isLoading,
);

/** Selects error authorization. */
export const selectAuthError = createSelector(
  (state: RootState) => state.auth.error,
  error => error,
);

/** Selects checking state. */
export const selectIsCheckingAuthorized = createSelector(
  (state: RootState) => state.auth.isCheckingAuthorized,
  isChecking => isChecking,
);

/** Selects is authorized. */
export const selectIsAuthorized = createSelector(
  (state: RootState) => state.auth.isAuthorized,
  isAuthorized => isAuthorized,
);
