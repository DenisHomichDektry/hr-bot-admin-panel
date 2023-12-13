import { api } from '~/store/api/api.ts';

import { ENDPOINTS, TAGS } from '~/constants';

import { IFeedback, IFeedbackQuery } from './types.ts';

export const feedbackApi = api.injectEndpoints({
  endpoints: (build) => ({
    feedbacks: build.query<[IFeedback[], number], IFeedbackQuery>({
      query: (params) => ({
        url: ENDPOINTS.FEEDBACK,
        params,
      }),
      providesTags: (result) =>
        result
          ? [...result[0].map(({ id }) => ({ type: TAGS.FEEDBACK, id })), { type: TAGS.FEEDBACK, id: 'LIST' }]
          : [{ type: TAGS.FEEDBACK, id: 'LIST' }],
    }),
  }),
});

export const { useFeedbacksQuery } = feedbackApi;
