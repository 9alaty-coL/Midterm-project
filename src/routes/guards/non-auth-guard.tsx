import { FC } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsAuthorized } from 'src/store/auth/selectors';

export const NonAuthGuard: FC = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const [search] = useSearchParams();

  if (isAuthorized) {
    const redirect = search.get('next') ?? '';
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
