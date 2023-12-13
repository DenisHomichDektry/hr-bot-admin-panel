import { ReactNode } from 'react';

import { ROUTES } from '~/constants/routes.ts';
import { Iconify } from '~/components/atoms/Iconify';
// ----------------------------------------------------------------------

const getIcon = (icon: string) => <Iconify width={28} icon={icon} />;

export interface INavItem {
  title: string;
  path: string;
  icon: ReactNode;
}
export const navConfig: INavItem[] = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: getIcon('ic:round-dashboard'),
  },
  {
    title: 'Onboarding',
    path: ROUTES.ONBOARDING,
    icon: getIcon('streamline:class-lesson-solid'),
  },
  {
    title: 'Feedback',
    path: ROUTES.FEEDBACK,
    icon: getIcon('ic:round-feedback'),
  },
  {
    title: 'User management',
    path: ROUTES.USER_MANAGEMENT,
    icon: getIcon('ph:users-three-fill'),
  },
  {
    title: 'Knowledge base',
    path: ROUTES.KNOWLEDGE_BASE,
    icon: getIcon('wpf:books'),
  },
  {
    title: 'Expenses',
    path: ROUTES.EXPENSES,
    icon: getIcon('mdi:papers'),
  },
];
