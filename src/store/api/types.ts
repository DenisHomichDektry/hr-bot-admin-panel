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
}
