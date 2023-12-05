import { IItem } from '~/store/api';

export type TItemEdit = IItem | Pick<IItem, 'title' | 'link' | 'categoryId'>;
