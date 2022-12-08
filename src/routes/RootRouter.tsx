import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { postsRoutes } from 'src/features/posts/routes';
import { authRoutes } from 'src/features/auth/routes';
import { homeRoutes } from 'src/features/home/routes';
import { groupRoutes } from 'src/features/group/routes';
import { profileRoutes } from 'src/features/profile/routes';
import { presentationRoutes } from 'src/features/presentation/routes';
import { viewRoutes } from 'src/features/view/routes'

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
  ...presentationRoutes,
  ...viewRoutes
];

export const RootRouter: FC = () => useRoutes(routes);
