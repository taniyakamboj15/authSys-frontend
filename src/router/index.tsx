import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';
import { AppLayout } from '../components/layout/AppLayout';
import { AuthGuard } from '../auth/auth.guard';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import { VerifyEmail } from '../pages/VerifyEmail';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Navigate to={ROUTES.PROFILE} replace />, // Redirect root to profile (or login if guarded)
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmail />,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: ROUTES.PROFILE,
            element: <Profile />,
          },
        ],
      },
      // 404 Fallback
      {
        path: '*',
        element: <Navigate to={ROUTES.LOGIN} replace />,
      }
    ],
  },
]);
