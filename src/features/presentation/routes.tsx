import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from 'src/routes/guards/auth-guard';

import { DetailPresentPage } from './pages/DetailPresentPage/DetailPresentPage';
import { PresentPage } from './pages/PresentPage/PresentPage';
import { VotePage } from './pages/VotePage/VotePage';

const PresentationPage = lazy(() => import('./pages/PresentationPage/PresentationPage').then(module => ({ default: module.PresentationPage })));

export const presentationRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'presentation',
        element: <PresentationPage />,
      },
      {
        path: 'presentation/new',
        element: <DetailPresentPage />
      },
      {
        path: 'presentation/edit/:id',
        element: <DetailPresentPage />,
        children: [
          {
            path: 'present',
            element: <PresentPage />,
          }
        ]
      },
    ],
  },
  {
    path: 'presentation/join/:id',
    element: <VotePage />
  }
];
