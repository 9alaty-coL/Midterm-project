import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { postsRoutes } from 'src/features/posts/routes';
import { authRoutes } from 'src/features/auth/routes';
import { homeRoutes } from 'src/features/home/routes';
import { groupRoutes } from 'src/features/group/routes';
import { profileRoutes } from 'src/features/profile/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  ...homeRoutes,
  ...authRoutes,
  ...postsRoutes,
  ...groupRoutes,
  ...profileRoutes,
];

export const RootRouter: FC = () => useRoutes(routes);
