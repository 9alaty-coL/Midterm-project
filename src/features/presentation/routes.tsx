import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from 'src/routes/guards/auth-guard';

const PresentationPage = lazy(() => import('./pages/PresentationPage').then(module => ({ default: module.PresentationPage })));

export const presentationRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'presentation',
        element: <PresentationPage />,
      },
    ],
  },
];
