export enum ROUTES {
  DASHBOARD = '/',
  ONBOARDING = '/onboarding',
  USER_MANAGEMENT = '/user-management',
  KNOWLEDGE_BASE = '/knowledge-base',
  EXPENSES = '/expenses',
  NOT_FOUND = '/not-found',
  LOGIN = '/login',
  NO_ACCESS = '/no-access',
}

export const publicRoutes = [ROUTES.LOGIN, ROUTES.NO_ACCESS, ROUTES.NOT_FOUND];
