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
