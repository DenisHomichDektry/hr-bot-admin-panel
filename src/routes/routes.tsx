import { FC, lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { RootLayout } from '~/components/layouts/RootLayout';
import { Error } from '~/pages/Error';
import { publicRoutes, ROUTES } from '~/constants';
import { isTokenExist } from '~/utils';
import { store } from '~/store';
import { handleExpiredToken } from '~/store/common';

const OnboardingPage = lazy(() => import('../pages/Onboarding/Onboarding'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFound'));
const KnowledgeBasePage = lazy(() => import('../pages/KnowledgeBase/KnowledgeBase'));
const UserManagementPage = lazy(() => import('../pages/UserManagement/UserManagement'));
const LoginPage = lazy(() => import('../pages/Login/Login'));
const NoAccessPage = lazy(() => import('../pages/NoAccess/NoAccess'));
const DashboardPage = lazy(() => import('../pages/Dashboard/Dashboard'));
const ExpensesPage = lazy(() => import('../pages/Expenses/Expenses'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <Suspense>
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

router.subscribe((route) => {
  if (
    !isTokenExist() &&
    !publicRoutes.includes(route.location.pathname as ROUTES) &&
    route.location.pathname !== ROUTES.LOGIN
  ) {
    store.dispatch(handleExpiredToken());
  }
});
