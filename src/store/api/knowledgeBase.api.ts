import { api } from '~/store/api/api.ts';

import { ENDPOINTS, TAGS } from '~/constants';

import { ICategory, IItem } from './types.ts';

export const knowledgeBaseApi = api.injectEndpoints({
  endpoints: (build) => ({
    categories: build.query<ICategory[], void>({
      query: () => ENDPOINTS.KNOWLEDGE_BASE_CATEGORY,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: TAGS.CATEGORY, id })), { type: TAGS.CATEGORY, id: 'LIST' }]
          : [{ type: TAGS.CATEGORY, id: 'LIST' }],
    }),
    upsertCategory: build.mutation<void, ICategory[]>({
      query: (categories) => ({
        url: ENDPOINTS.KNOWLEDGE_BASE_CATEGORY_BATCH,
        method: 'PATCH',
        body: { data: categories },
      }),
      invalidatesTags: (result, error, categories) => (error ? [] : [{ type: TAGS.CATEGORY, id: 'LIST' }]),
    }),
    deleteCategory: build.mutation<void, ICategory[]>({
      query: (categories) => ({
        url: ENDPOINTS.KNOWLEDGE_BASE_CATEGORY_BATCH,
        method: 'DELETE',
        body: { data: categories },
      }),
      invalidatesTags: (result, error, categories) => (error ? [] : [{ type: TAGS.CATEGORY, id: 'LIST' }]),
    }),
    items: build.query<IItem[], string>({
      query: (categoryId) => ENDPOINTS.KNOWLEDGE_BASE_ITEMS.replace(':categoryId', categoryId),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: TAGS.ITEM, id })), { type: TAGS.ITEM, id: 'LIST' }]
          : [{ type: TAGS.ITEM, id: 'LIST' }],
    }),
    createItem: build.mutation<void, Pick<IItem, 'title' | 'link' | 'categoryId'>>({
      query: (item) => ({
        url: ENDPOINTS.KNOWLEDGE_BASE_ITEM,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: (result, error, item) => (error ? [] : [{ type: TAGS.ITEM, id: 'LIST' }]),
    }),
    editItem: build.mutation<void, IItem>({
      query: (item) => ({
        url: ENDPOINTS.KNOWLEDGE_BASE_ITEM,
        method: 'PATCH',
        body: item,
      }),
      invalidatesTags: (result, error, item) => (error ? [] : [{ type: TAGS.ITEM, id: item.id }]),
    }),
    deleteItem: build.mutation<void, string>({
      query: (id) => ({
        url: ENDPOINTS.KNOWLEDGE_BASE_ITEM_ID.replace(':id', id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => (error ? [] : [{ type: TAGS.ITEM, id: 'LIST' }]),
    }),
  }),
});

export const {
  useCategoriesQuery,
  useItemsQuery,
  useDeleteItemMutation,
  useEditItemMutation,
  useCreateItemMutation,
  useUpsertCategoryMutation,
  useDeleteCategoryMutation,
} = knowledgeBaseApi;
