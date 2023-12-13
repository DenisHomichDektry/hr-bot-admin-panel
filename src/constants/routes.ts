export enum ROUTES {
  DASHBOARD = '/',
  ONBOARDING = '/onboarding',
  USER_MANAGEMENT = '/user-management',
  KNOWLEDGE_BASE = '/knowledge-base',
  EXPENSES = '/expenses',
  FEEDBACK = '/feedback',
  NOT_FOUND = '/not-found',
  LOGIN = '/login',
  NO_ACCESS = '/no-access',
}

export const publicRoutes = [ROUTES.NO_ACCESS, ROUTES.NOT_FOUND];
