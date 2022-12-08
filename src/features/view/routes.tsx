import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from 'src/routes/guards/auth-guard';

import { ViewMemberPage } from './pages/ViewMemberPage'

const ViewHostPage = lazy(() => import('./pages/ViewHostPage').then(module => ({ default: module.ViewHostPage })));

export const viewRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'host',
        element: <ViewHostPage />,
      },
      {
        path: 'member',
        element: <ViewMemberPage />,
      }
    ],
  },
];
