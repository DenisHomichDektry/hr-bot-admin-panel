import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ENDPOINTS, TAGS } from '~/constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ['Messages', TAGS.CATEGORY, TAGS.ITEM, TAGS.USER, TAGS.USER_ROLE, TAGS.ONBOARDING],
  endpoints: (builder) => ({
    // TODO: remove this before production
    getTest: builder.query<{ id: number; message: string }, number>({
      query: (id) => ({
        url: ENDPOINTS.TEST + `/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Messages', id }],
    }),
    updateTest: builder.mutation<void, { id: number; message: string }>({
      query: (body) => ({
        url: ENDPOINTS.TEST,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Messages', id: body.id }]),
    }),
  }),
});

export const { useGetTestQuery, useUpdateTestMutation } = api;
