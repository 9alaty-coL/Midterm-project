import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { NonAuthGuard } from 'src/routes/guards/non-auth-guard';
import { RegisterPage } from './pages/LoginPage/RegisterPage';

const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));

export const authRoutes: RouteObject[] = [
  {
    element: <NonAuthGuard />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: '*',
        element: <Navigate to="login" />,
      },
    ],
  },
];
