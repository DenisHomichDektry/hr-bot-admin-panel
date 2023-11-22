import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { RootLayout } from '~/components/layouts/RootLayout';
import { Error } from '~/pages/Error';
import { Routes } from '~/constants/routes.ts';

const OnboardingPage = lazy(() => import('../pages/Onboarding/Onboarding'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const KnowledgeBasePage = lazy(() => import('../pages/KnowledgeBase/KnowledgeBase'));
const UserManagement = lazy(() => import('../pages/UserManagement/UserManagement'));

const Fallback = () => <div>Loading...</div>;

export const router = createBrowserRouter([
  {
    element: (
      <RootLayout>
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </RootLayout>
    ),
    errorElement: <Error />,
    children: [
      { element: <OnboardingPage />, index: true, errorElement: <Error /> },
      { path: Routes.KNOWLEDGE_BASE, element: <KnowledgeBasePage />, errorElement: <Error /> },
      { path: Routes.USER_MANAGEMENT, element: <UserManagement />, errorElement: <Error /> },
    ],
  },
  { path: Routes.NOT_FOUND, element: <NotFound />, errorElement: <Error /> },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
