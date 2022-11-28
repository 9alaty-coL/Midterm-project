import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from 'src/routes/guards/auth-guard';
import { JoinGroupPage } from './pages/JoinGroupPage';

const GroupPage = lazy(() => import('./pages').then(module => ({ default: module.GroupPage })));

export const groupRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'group',
        element: <GroupPage />,
      },
      {
        path: 'group/join/:groupId',
        element: <JoinGroupPage />,
      }
    ]
  },
];
