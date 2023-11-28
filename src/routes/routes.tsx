import { FC, lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { RootLayout } from '~/components/layouts/RootLayout';
import { Error } from '~/pages/Error';
import { ROUTES } from '~/constants';

const OnboardingPage = lazy(() => import('../pages/Onboarding/Onboarding'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFound'));
const KnowledgeBasePage = lazy(() => import('../pages/KnowledgeBase/KnowledgeBase'));
const UserManagementPage = lazy(() => import('../pages/UserManagement/UserManagement'));
const LoginPage = lazy(() => import('../pages/Login/Login'));
const NoAccessPage = lazy(() => import('../pages/NoAccess/NoAccess'));
const DashboardPage = lazy(() => import('../pages/Dashboard/Dashboard'));
const ExpensesPage = lazy(() => import('../pages/Expenses/Expenses'));

const Fallback: FC = (props) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDisplay(true), 30);
    return () => clearTimeout(timeout);
  }, []);

  return display ? <div>Loading...</div> : null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </RootLayout>
    ),
    errorElement: <Error />,
    children: [
      { element: <DashboardPage />, index: true, errorElement: <Error /> },
      { path: ROUTES.ONBOARDING, element: <OnboardingPage />, errorElement: <Error /> },
      { path: ROUTES.KNOWLEDGE_BASE, element: <KnowledgeBasePage />, errorElement: <Error /> },
      { path: ROUTES.USER_MANAGEMENT, element: <UserManagementPage />, errorElement: <Error /> },
      { path: ROUTES.EXPENSES, element: <ExpensesPage />, errorElement: <Error /> },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: ROUTES.NO_ACCESS,
    element: (
      <Suspense>
        <NoAccessPage />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: (
      <Suspense>
        <NotFoundPage />
      </Suspense>
    ),
    errorElement: <Error />,
  },
  { path: '*', element: <Navigate to={ROUTES.NOT_FOUND} replace /> },
]);
