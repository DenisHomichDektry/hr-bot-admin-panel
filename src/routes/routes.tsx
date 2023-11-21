import { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { KnowledgeBase } from '../pages/KnowledgeBase';
import { Onboarding } from '../pages/Onboarding';
import { UserManagement } from '../pages/UserManagement';
import { RootLayout } from '~/components/layouts/RootLayout';

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
    children: [
      { element: <Fallback />, index: true },
      //       { path: "user", element: <KnowledgeBase /> },
      //       { path: "products", element: <Onboarding /> },
      //       { path: "blog", element: <UserManagement /> },
    ],
  },
]);
