import { FC, useEffect } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectIsAuthorized } from 'src/store/auth/selectors';
import { UserActions } from 'src/store/profile/dispatchers';

export const AuthGuard: FC = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(UserActions.fetchProfile())
  }, [])

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (!isAuthorized) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
