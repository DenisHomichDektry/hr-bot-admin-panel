import { ReactNode } from 'react';

import { SvgColor } from '~/components/atoms/SvgColor';
import { ROUTES } from '~/constants/routes.ts';
// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export interface INavItem {
  title: string;
  path: string;
  icon: ReactNode;
}
export const navConfig: INavItem[] = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: icon('ic_analytics'),
  },
  {
    title: 'Onboarding',
    path: ROUTES.ONBOARDING,
    icon: icon('ic_analytics'),
  },
  {
    title: 'User management',
    path: ROUTES.USER_MANAGEMENT,
    icon: icon('ic_user'),
  },
  {
    title: 'Knowledge base',
    path: ROUTES.KNOWLEDGE_BASE,
    icon: icon('ic_blog'),
  },
  {
    title: 'Expenses',
    path: ROUTES.EXPENSES,
    icon: icon('ic_user'),
  },
];
