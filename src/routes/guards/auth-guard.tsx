import { FC } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsAuthorized } from 'src/store/auth/selectors';

export const AuthGuard: FC = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const location = useLocation();

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
