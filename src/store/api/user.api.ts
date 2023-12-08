import { api } from '~/store/api/api.ts';

import { ENDPOINTS, TAGS } from '~/constants';

import { IRole, IUpdateUser, IUser, IUserQuery } from './types.ts';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    users: build.query<[IUser[], number], IUserQuery>({
      query: (params) => ({
        url: ENDPOINTS.USER,
        params,
      }),
      providesTags: (result) =>
        result
          ? [...result[0].map(({ id }) => ({ type: TAGS.USER, id })), { type: TAGS.USER, id: 'LIST' }]
          : [{ type: TAGS.USER, id: 'LIST' }],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `${ENDPOINTS.USER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: TAGS.USER, id: 'LIST' }],
    }),
    userRoles: build.query<IRole[], void>({
      query: () => `${ENDPOINTS.USER}/role`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: TAGS.USER_ROLE, id })) : [{ type: TAGS.USER_ROLE, id: 'LIST' }],
    }),
    updateUser: build.mutation<void, IUpdateUser>({
      query: (body) => ({
        url: ENDPOINTS.USER,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: TAGS.USER, id }],
    }),
  }),
});

export const { useUsersQuery, useDeleteUserMutation, useUserRolesQuery, useUpdateUserMutation } = userApi;
