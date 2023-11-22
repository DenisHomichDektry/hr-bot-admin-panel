import { ReactNode } from 'react';

import { SvgColor } from '~/components/atoms/SvgColor';
import { Routes } from '~/constants/routes.ts';
// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export interface INavItem {
  title: string;
  path: string;
  icon: ReactNode;
}
export const navConfig: INavItem[] = [
  {
    title: 'Onboarding',
    path: Routes.ONBOARDING,
    icon: icon('ic_analytics'),
  },
  {
    title: 'User management',
    path: Routes.USER_MANAGEMENT,
    icon: icon('ic_user'),
  },
  {
    title: 'Knowledge base',
    path: Routes.KNOWLEDGE_BASE,
    icon: icon('ic_blog'),
  },
];
