import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from 'src/routes/guards/auth-guard';

const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));

export const profileRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
];
