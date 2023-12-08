import { api } from '~/store/api/api.ts';

import { ENDPOINTS, TAGS } from '~/constants';

import { IOnboardingStep, IOnboardingStepUpsert } from './types.ts';

export const onboardingApi = api.injectEndpoints({
  endpoints: (build) => ({
    onboardingStep: build.query<IOnboardingStep[], void>({
      query: () => ENDPOINTS.ONBOARDING,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: TAGS.ONBOARDING, id })), { type: TAGS.ONBOARDING, id: 'LIST' }]
          : [{ type: TAGS.ONBOARDING, id: 'LIST' }],
    }),
    upsertOnboardingStep: build.mutation<void, IOnboardingStepUpsert[]>({
      query: (payload) => ({
        url: ENDPOINTS.ONBOARDING,
        method: 'POST',
        body: {
          items: payload,
        },
      }),
      invalidatesTags: [{ type: TAGS.ONBOARDING, id: 'LIST' }],
    }),
    deleteOnboardingStep: build.mutation<void, string>({
      query: (id) => ({
        url: ENDPOINTS.ONBOARDING_ID.replace(':id', id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: TAGS.ONBOARDING, id }],
    }),
  }),
});

export const { useOnboardingStepQuery, useUpsertOnboardingStepMutation, useDeleteOnboardingStepMutation } =
  onboardingApi;
