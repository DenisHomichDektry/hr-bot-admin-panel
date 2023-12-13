export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
}

export interface IItem {
  id: string;
  title: string;
  link: string;
  categoryId?: string;
  createdAt: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  imgUrl: string | null;
  role: IRole;
  position: string | null;
  createdAt: string;
}

export interface IRole {
  id: string;
  name: 'admin' | 'user';
  createdAt: string;
}

export interface IUserQuery {
  limit?: number;
  page?: number;
}

export interface IUpdateUser {
  id: string;
  firstName?: string;
  lastName?: string;
  roleId?: string;
  email?: string;
  position?: string;
}

export interface IOnboardingStep {
  id: string;
  title: string;
  description: string;
  link: string;
  order: number;
  notificationIntervals: number[];
  createdAt: string;
}

export interface IOnboardingStepUpsert extends Partial<IOnboardingStep> {
  id?: string;
  order: number;
}

export interface IFeedbackQuery {
  limit?: number;
  page?: number;
}

export interface IFeedback {
  id: string;
  value: number;
  createdAt: string;
  user: IUser;
}
